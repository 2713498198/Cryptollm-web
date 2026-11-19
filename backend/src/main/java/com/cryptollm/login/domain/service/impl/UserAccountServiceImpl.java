package com.cryptollm.login.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cryptollm.common.base.utils.IdUtil;
import com.cryptollm.login.domain.context.ChangePasswordContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.domain.service.UserAccountService;
import com.cryptollm.login.exception.AuthErrorCode;
import com.cryptollm.login.exception.AuthException;
import com.cryptollm.login.infrastructure.mapper.UserAccountMapper;
import com.cryptollm.login.response.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 用户账号领域服务实现。
 *
 * <p>参照 MyBatis-Plus 标准写法继承 {@link ServiceImpl}，使用父类注入的
 * {@code baseMapper} 完成用户账号 CRUD，同时实现账号领域业务接口。</p>
 */
@Service
@RequiredArgsConstructor
public class UserAccountServiceImpl
        extends ServiceImpl<UserAccountMapper, UserAccountDO>
        implements UserAccountService {

    private static final int PERSONAL_ACCOUNT_TYPE = 1;
    private static final int ACCOUNT_STATUS_NORMAL = 1;
    private static final int REAL_NAME_UNVERIFIED = 0;

    private final PasswordEncoder passwordEncoder;

    /**    (non-Javadoc)
     * 根据电话号查找用户
     * @see com.cryptollm.login.domain.service.UserAccountService#findByPhone(java.lang.String, java.lang.String)
     */
    @Override
    public UserAccountDO findByPhone(String phoneCountryCode, String phone) {
        return lambdaQuery()
                .eq(UserAccountDO::getPhoneCountryCode, phoneCountryCode)
                .eq(UserAccountDO::getPhone, phone)
                .one();
    }

    /**    (non-Javadoc)
     * 根据电话号创建新用户
     * @see com.cryptollm.login.domain.service.UserAccountService#createPhoneAccount(java.lang.String, java.lang.String)
     */
    @Override
    public UserAccountDO createPhoneAccount(String phoneCountryCode, String phone) {
        LocalDateTime now = LocalDateTime.now();
        String normalizedCountryCode = phoneCountryCode.replace("+", "");

        UserAccountDO userAccount = new UserAccountDO();
        Long userId = IdUtil.get();
        userAccount.setId(userId);
        userAccount.setAccountNo(userId.toString());
        userAccount.setUsername("crypto_" + normalizedCountryCode + "_" + phone);
        userAccount.setNickname("用户" + phone.substring(phone.length() - 4));
        userAccount.setPhoneCountryCode(phoneCountryCode);
        userAccount.setPhone(phone);
        userAccount.setAccountType(PERSONAL_ACCOUNT_TYPE);
        userAccount.setStatus(ACCOUNT_STATUS_NORMAL);
        userAccount.setRealNameStatus(REAL_NAME_UNVERIFIED);
        userAccount.setTwoFactorEnabled(false);
        userAccount.setBalance(BigDecimal.ZERO);
        userAccount.setLastLoginTime(now);

        if (!save(userAccount)) {
            throw new AuthException(AuthErrorCode.USER_CREATE_FAILED);
        }
        return userAccount;
    }

    @Override
    public UserInfoVO getCurrentUserInfo() {
        // TODO: 从登录上下文获取账号并查询用户资料。
        throw new UnsupportedOperationException("TODO: get current user info");
    }

    @Override
    public void changePassword(ChangePasswordContext context) {
        // TODO: 再次校验短信验证码、校验密码并更新密码哈希。
        throw new UnsupportedOperationException("TODO: change password");
    }
}
