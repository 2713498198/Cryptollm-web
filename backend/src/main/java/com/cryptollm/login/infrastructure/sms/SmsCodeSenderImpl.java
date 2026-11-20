package com.cryptollm.login.infrastructure.sms;

import com.cryptollm.login.domain.enums.VerificationCodeScene;
import org.springframework.stereotype.Component;

/**
 * 短信发送器骨架，后续替换为具体短信供应商实现。
 */
@Component
public class SmsCodeSenderImpl implements SmsCodeSender {

    @Override
    public void send(
            String phoneCountryCode,
            String phone,
            String verificationCode,
            VerificationCodeScene scene
    ) {
        // TODO: 接入短信服务商并处理发送结果。
        throw new UnsupportedOperationException("TODO: send sms code");
    }
}
