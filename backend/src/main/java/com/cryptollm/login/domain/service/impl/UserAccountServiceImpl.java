package com.cryptollm.login.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cryptollm.login.domain.context.ChangePasswordContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.domain.service.UserAccountService;
import com.cryptollm.login.infrastructure.mapper.UserAccountMapper;
import com.cryptollm.login.response.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserAccountDO findByPhone(String phoneCountryCode, String phone) {
        // TODO: 查询手机号对应的用户账号。
        throw new UnsupportedOperationException("TODO: find user by phone");
    }

    @Override
    public UserAccountDO createPhoneAccount(String phoneCountryCode, String phone) {
        // TODO: 生成账号 ID、用户名和默认资料，并写入 user_account。
        throw new UnsupportedOperationException("TODO: create phone account");
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
