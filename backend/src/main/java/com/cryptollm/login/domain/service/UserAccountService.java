package com.cryptollm.login.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cryptollm.login.domain.context.ChangePasswordContext;
import com.cryptollm.login.domain.entity.UserAccountDO;
import com.cryptollm.login.response.UserInfoVO;

/**
 * 用户账号领域服务。
 *
 * <p>继承 MyBatis-Plus 的 {@link IService}，提供用户账号基础 CRUD 能力，
 * 并保留账号资料和密码修改相关的领域业务方法。</p>
 */
public interface UserAccountService extends IService<UserAccountDO> {

    UserAccountDO findByPhone(String phoneCountryCode, String phone);

    UserAccountDO createPhoneAccount(String phoneCountryCode, String phone);

    UserInfoVO getCurrentUserInfo();

    void changePassword(ChangePasswordContext context);
}
