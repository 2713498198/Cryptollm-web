package com.cryptollm.login.param;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 账号密码登录请求。
 */
@Getter
@Setter
public class AccountLoginParamVO {

    @NotBlank(message = "用户名、邮箱或手机号不能为空")
    private String account;

    @NotBlank(message = "密码不能为空")
    private String password;

    private boolean rememberMe;
}
