package com.cryptollm.login.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cryptollm.login.domain.context.AccountLoginContext;
import com.cryptollm.login.domain.context.PhoneLoginContext;
import com.cryptollm.login.domain.context.SendVerificationCodeContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.response.LoginResVO;

/**
 * 登录认证领域服务。
 *
 * <p>同时继承 MyBatis-Plus 的 {@link IService}，提供用户账号基础 CRUD 能力，
 * 并保留登录认证相关的领域业务方法。</p>
 */
public interface AuthService extends IService<UserAccountDO> {

    void sendVerificationCode(SendVerificationCodeContext context);

    LoginResVO phoneLogin(PhoneLoginContext context);

    LoginResVO accountLogin(AccountLoginContext context);

    void logout(String accessToken);
}
