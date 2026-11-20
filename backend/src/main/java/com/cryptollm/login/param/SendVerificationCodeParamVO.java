package com.cryptollm.login.param;

import com.cryptollm.login.domain.enums.VerificationCodeScene;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

/**
 * 发送短信验证码请求。
 */
@Getter
@Setter
public class SendVerificationCodeParamVO {

    @NotBlank(message = "国家或地区代码不能为空")
    private String phoneCountryCode;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @NotNull(message = "验证码场景不能为空")
    private VerificationCodeScene scene;
}
