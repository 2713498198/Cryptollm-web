package com.cryptollm.login.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cryptollm.login.domain.context.AccountLoginContext;
import com.cryptollm.login.domain.context.PhoneLoginContext;
import com.cryptollm.login.domain.context.SendVerificationCodeContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.domain.service.AuthService;
import com.cryptollm.login.domain.service.UserAccountService;
import com.cryptollm.login.infrastructure.cache.LoginTokenCache;
import com.cryptollm.login.infrastructure.cache.VerificationCodeCache;
import com.cryptollm.login.infrastructure.config.AuthProperties;
import com.cryptollm.login.infrastructure.mapper.UserAccountMapper;
import com.cryptollm.login.infrastructure.sms.SmsCodeSender;
import com.cryptollm.login.response.LoginResVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 登录认证领域服务实现。
 *
 * <p>参照 MyBatis-Plus 标准写法继承 {@link ServiceImpl}，由父类提供
 * {@code baseMapper} 和通用 CRUD 实现，同时实现登录认证领域接口。</p>
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        extends ServiceImpl<UserAccountMapper, UserAccountDO>
        implements AuthService {

    private final UserAccountService userAccountService;
    private final VerificationCodeCache verificationCodeCache;
    private final LoginTokenCache loginTokenCache;
    private final SmsCodeSender smsCodeSender;
    private final PasswordEncoder passwordEncoder;
    private final AuthProperties authProperties;

    @Override
    public void sendVerificationCode(SendVerificationCodeContext context) {
        // TODO: 校验发送频率、生成验证码、写入 Redis 并调用短信发送器。

        throw new UnsupportedOperationException("TODO: send verification code");
    }

    @Override
    public LoginResVO phoneLogin(PhoneLoginContext context) {
        // TODO: 校验验证码；用户不存在时首次自动注册，之后签发登录 Token。
        throw new UnsupportedOperationException("TODO: phone login");
    }

    @Override
    public LoginResVO accountLogin(AccountLoginContext context) {
        // TODO: 按用户名、邮箱或手机号查询账号并校验密码。
        throw new UnsupportedOperationException("TODO: account login");
    }

    @Override
    public void logout(String accessToken) {
        // TODO: 删除 Redis 中的登录 Token 和关联会话。
        throw new UnsupportedOperationException("TODO: logout");
    }
}
