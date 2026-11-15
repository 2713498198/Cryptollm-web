package com.cryptollm.login.infrastructure.sms;

import com.cryptollm.login.domain.enums.VerificationCodeScene;

/**
 * 短信验证码发送器抽象。
 */
public interface SmsCodeSender {

    void send(
            String phoneCountryCode,
            String phone,
            String verificationCode,
            VerificationCodeScene scene
    );
}
