package com.cryptollm.login.infrastructure.cache;

import com.cryptollm.login.domain.enums.VerificationCodeScene;
import com.cryptollm.login.infrastructure.constant.AuthConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

/**
 * 短信验证码 Redis 缓存。
 */
@Component
@RequiredArgsConstructor
public class VerificationCodeCache {

    private final StringRedisTemplate stringRedisTemplate;

    public void save(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene,
            String verificationCode,
            long expireSeconds
    ) {
        stringRedisTemplate.opsForValue().set(
                buildVerificationCodeKey(phoneCountryCode, phone, scene),
                verificationCode,
                Duration.ofSeconds(expireSeconds)
        );
    }

    public String find(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene
    ) {
        return stringRedisTemplate.opsForValue().get(
                buildVerificationCodeKey(phoneCountryCode, phone, scene)
        );
    }

    public void delete(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene
    ) {
        stringRedisTemplate.delete(
                buildVerificationCodeKey(phoneCountryCode, phone, scene)
        );
    }

    public boolean canSend(String phoneCountryCode, String phone) {
        return Boolean.FALSE.equals(
                stringRedisTemplate.hasKey(buildResendKey(phoneCountryCode, phone))
        );
    }

    public void markSent(
            String phoneCountryCode,
            String phone,
            long intervalSeconds
    ) {
        stringRedisTemplate.opsForValue().set(
                buildResendKey(phoneCountryCode, phone),
                "1",
                Duration.ofSeconds(intervalSeconds)
        );
    }

    private String buildVerificationCodeKey(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene
    ) {
        return AuthConstant.SMS_CODE_PREFIX
                + phoneCountryCode
                + ":"
                + phone
                + ":"
                + scene.name();
    }

    private String buildResendKey(String phoneCountryCode, String phone) {
        return AuthConstant.SMS_RESEND_PREFIX + phoneCountryCode + ":" + phone;
    }
}
