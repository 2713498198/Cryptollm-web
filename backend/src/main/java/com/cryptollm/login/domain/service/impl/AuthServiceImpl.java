package com.cryptollm.login.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cryptollm.login.domain.context.AccountLoginContext;
import com.cryptollm.login.domain.context.PhoneLoginContext;
import com.cryptollm.login.domain.context.SendVerificationCodeContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.domain.enums.VerificationCodeScene;
import com.cryptollm.login.domain.service.AuthService;
import com.cryptollm.login.domain.service.UserAccountService;
import com.cryptollm.login.exception.AuthErrorCode;
import com.cryptollm.login.exception.AuthException;
import com.cryptollm.login.infrastructure.cache.LoginTokenCache;
import com.cryptollm.login.infrastructure.cache.VerificationCodeCache;
import com.cryptollm.login.infrastructure.config.AuthProperties;
import com.cryptollm.login.infrastructure.mapper.UserAccountMapper;
import com.cryptollm.login.infrastructure.sms.SmsCodeSender;
import com.cryptollm.login.response.LoginResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * 登录认证领域服务实现。
 *
 * <p>参照 MyBatis-Plus 标准写法继承 {@link ServiceImpl}，由父类提供
 * {@code baseMapper} 和通用 CRUD 实现，同时实现登录认证领域接口。</p>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        extends ServiceImpl<UserAccountMapper, UserAccountDO>
        implements AuthService {

    // 正则表达式 手机号以1开头 第二位是3-9 后面紧跟9个数字 总长11位
    private static final Pattern MAINLAND_PHONE_PATTERN =
            Pattern.compile("^1[3-9]\\d{9}$");
    // 验证码正则表达式
    private static final Pattern VERIFICATION_CODE_PATTERN =
            Pattern.compile("^\\d{6}$");
    private static final int ACCOUNT_STATUS_NORMAL = 1;

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Autowired
    private final UserAccountService userAccountService;

    private final VerificationCodeCache verificationCodeCache;
    private final LoginTokenCache loginTokenCache;
    private final SmsCodeSender smsCodeSender;
    private final PasswordEncoder passwordEncoder;
    private final AuthProperties authProperties;

    /**    (non-Javadoc)
     * 发送验证码
     * @see com.cryptollm.login.domain.service.AuthService#sendVerificationCode(com.cryptollm.login.domain.context.SendVerificationCodeContext)
     */
    @Override
    public void sendVerificationCode(SendVerificationCodeContext context) {
        // 校验手机号合法性
        validateSendVerificationCodeContext(context);

        String phoneCountryCode = context.getPhoneCountryCode().trim();
        String phone = context.getPhone().trim();
        VerificationCodeScene scene = context.getScene();

        // 通过 Redis 检查 60 秒发送冷却时间
        if (!verificationCodeCache.canSend(phoneCountryCode, phone)) {
            throw new AuthException(AuthErrorCode.SMS_CODE_SEND_TOO_FREQUENT);
        }

        // 使用 SecureRandom 生成 6 位数字验证码
        String verificationCode = generateVerificationCode();
        // 按手机号和验证码场景写入 Redis，并设置默认 300 秒有效期
        verificationCodeCache.save(
                phoneCountryCode,
                phone,
                scene,
                verificationCode,
                authProperties.getSmsCodeExpireSeconds()
        );

        try {
            // 发送验证码 使用阿里云短信服务？
            smsCodeSender.send(phoneCountryCode, phone, verificationCode, scene);
            verificationCodeCache.markSent(
                    phoneCountryCode,
                    phone,
                    authProperties.getSmsResendIntervalSeconds() // 验证码冷却时间60秒 若60秒内已经发送过验证码时 `canSend` 返回 false，接口直接提示“验证码发送过于频繁”；冷却结束后才允许再次发送
            );
        } catch (RuntimeException exception) {
            verificationCodeCache.delete(phoneCountryCode, phone, scene);
            log.error("短信验证码发送失败，验证码场景：{}", scene, exception);
            throw new AuthException("验证码发送失败", AuthErrorCode.SMS_CODE_SEND_FAILED);
        }
    }

    private void validateSendVerificationCodeContext(SendVerificationCodeContext context) {
        if (context == null
                || !StringUtils.hasText(context.getPhoneCountryCode())
                || !StringUtils.hasText(context.getPhone())
                || !MAINLAND_PHONE_PATTERN.matcher(context.getPhone().trim()).matches()) {
            throw new AuthException(AuthErrorCode.PHONE_NUMBER_INVALID);
        }
        if (context.getScene() == null) {
            throw new AuthException(AuthErrorCode.VERIFICATION_SCENE_INVALID);
        }
    }

    private String generateVerificationCode() {
        return String.format("%06d", SECURE_RANDOM.nextInt(1_000_000));
    }

    /**    (non-Javadoc)
     * 手机号登录
     * @see com.cryptollm.login.domain.service.AuthService#phoneLogin(com.cryptollm.login.domain.context.PhoneLoginContext)
     */
    @Override
    public LoginResVO phoneLogin(PhoneLoginContext context) {
        // 1. 校验手机号 验证码
        validatePhoneLoginContext(context);

        String phoneCountryCode = context.getPhoneCountryCode().trim();
        String phone = context.getPhone().trim();
        String verificationCode = context.getVerificationCode().trim();

        // 2. 校验验证码
        String cachedVerificationCode = verificationCodeCache.find(
                phoneCountryCode,
                phone,
                VerificationCodeScene.LOGIN
        );
        // 校验不通过
        if (!StringUtils.hasText(cachedVerificationCode)
                || !cachedVerificationCode.equals(verificationCode)) {
            throw new AuthException(AuthErrorCode.VERIFICATION_CODE_WRONG);
        }
        // 验证码只能使用一次
        verificationCodeCache.delete(
                phoneCountryCode,
                phone,
                VerificationCodeScene.LOGIN
        );

        // 3. 根据手机号查询用户
        UserAccountDO userAccount = userAccountService.findByPhone(
                phoneCountryCode,
                phone
        );

        // 4. 判断用户是否存在
        boolean newUser = userAccount == null;

        // 5. 不存在，创建新用户并保存
        LocalDateTime loginTime = LocalDateTime.now();
        if (newUser) {
            userAccount = userAccountService.createPhoneAccount(
                    phoneCountryCode,
                    phone
            );
        } else {
            if (!Integer.valueOf(ACCOUNT_STATUS_NORMAL).equals(userAccount.getStatus())) {
                throw new AuthException(AuthErrorCode.ACCOUNT_STATUS_IS_NOT_ACTIVE);
            }
            userAccount.setLastLoginTime(loginTime);
            if (!userAccountService.updateById(userAccount)) {
                throw new AuthException(AuthErrorCode.USER_OPERATE_FAILED);
            }
        }

        // 6. Token 返回给前端；Redis Hash 只保存账号 ID、签发时间和过期时间
        String token = UUID.randomUUID().toString().replace("-", "");
        // 有效期7天 后续可设计为：不勾选“记住我”：例如 7 天 “记住我”：例如 30 天。
        long expireSeconds = authProperties.getTokenExpireSeconds();
        long issuedAt = System.currentTimeMillis();
        long expiresAt = issuedAt + expireSeconds * 1000;
        try {
            loginTokenCache.save(
                    token,
                    userAccount.getAccountNo(),
                    issuedAt,
                    expiresAt,
                    expireSeconds
            );
        } catch (RuntimeException exception) {
            log.error(
                    "保存手机号登录会话失败，账号 ID：{}",
                    userAccount.getAccountNo(),
                    exception
            );
            throw new AuthException(AuthErrorCode.LOGIN_TOKEN_SAVE_FAILED);
        }

        LoginResVO loginResult = new LoginResVO();
        loginResult.setAccountNo(userAccount.getAccountNo());
        loginResult.setUsername(userAccount.getUsername());
        loginResult.setNickname(userAccount.getNickname());
        loginResult.setToken(token);
        loginResult.setTokenExpiration(expiresAt);
        loginResult.setNewUser(newUser);
        loginResult.setLoginTime(loginTime);
        return loginResult;
    }

    @Override
    public LoginResVO accountLogin(AccountLoginContext context) {
        // TODO: 按用户名、邮箱或手机号查询账号并校验密码。
        throw new UnsupportedOperationException("TODO: account login");
    }

    @Override
    public void logout(String accessToken) {
        // 实现步骤：
        // 1. 校验 accessToken 不为空；如果为空，返回用户未登录错误。
        // 2. 规范化请求头中的 Token，去除首尾空格以及可选的 "Bearer " 前缀。
        // 3. 将规范化后的原始 Token 交给 LoginTokenCache.delete。
        //    LoginTokenCache 内部会计算 SHA-256，再删除对应的登录会话。
        // 4. 将退出操作设计为幂等：Token 对应的 Redis 会话不存在时，也视为退出成功。
        // 5. 清理 LoginUserContext，避免当前线程残留登录账号 ID。
        // 6. 记录必要的退出日志，但不得记录完整 Token 或用户敏感信息。
        // 7. 如果 Redis 操作发生异常，不返回“退出成功”，交由统一异常处理器处理。
        throw new UnsupportedOperationException("TODO: logout");
    }

    private void validatePhoneLoginContext(PhoneLoginContext context) {
        if (context == null
                || !StringUtils.hasText(context.getPhoneCountryCode())
                || !StringUtils.hasText(context.getPhone())
                || !MAINLAND_PHONE_PATTERN.matcher(context.getPhone().trim()).matches()) {
            throw new AuthException(AuthErrorCode.PHONE_NUMBER_INVALID);
        }
        if (!StringUtils.hasText(context.getVerificationCode())
                || !VERIFICATION_CODE_PATTERN
                .matcher(context.getVerificationCode().trim())
                .matches()) {
            throw new AuthException(AuthErrorCode.VERIFICATION_CODE_WRONG);
        }
    }

}
