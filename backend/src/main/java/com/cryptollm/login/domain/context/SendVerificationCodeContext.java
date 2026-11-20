package com.cryptollm.login.domain.context;

import com.cryptollm.login.domain.enums.VerificationCodeScene;
import lombok.Getter;
import lombok.Setter;

/**
 * 发送验证码领域上下文。
 */
@Getter
@Setter
public class SendVerificationCodeContext {

    private String phoneCountryCode;
    private String phone;
    private VerificationCodeScene scene;
}
