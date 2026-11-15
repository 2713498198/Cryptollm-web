package com.cryptollm.login.domain.context;

import lombok.Getter;
import lombok.Setter;

/**
 * 手机号登录领域上下文。
 */
@Getter
@Setter
public class PhoneLoginContext {

    private String phoneCountryCode;
    private String phone;
    private String verificationCode;
    private boolean rememberMe;
}
