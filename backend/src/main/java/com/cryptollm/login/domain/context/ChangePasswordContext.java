package com.cryptollm.login.domain.context;

import lombok.Getter;
import lombok.Setter;

/**
 * 修改密码领域上下文。
 */
@Getter
@Setter
public class ChangePasswordContext {

    private String phoneCountryCode;
    private String phone;
    private String verificationCode;
    private String newPassword;
    private String confirmPassword;
}
