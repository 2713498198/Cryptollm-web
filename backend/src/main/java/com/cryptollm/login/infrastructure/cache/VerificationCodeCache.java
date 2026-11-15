package com.cryptollm.login.infrastructure.cache;

import com.cryptollm.login.domain.enums.VerificationCodeScene;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

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
        // TODO: 写入验证码并设置过期时间。
        throw new UnsupportedOperationException("TODO: save verification code");
    }

    public String find(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene
    ) {
        // TODO: 从 Redis 读取验证码。
        throw new UnsupportedOperationException("TODO: find verification code");
    }

    public void delete(
            String phoneCountryCode,
            String phone,
            VerificationCodeScene scene
    ) {
        // TODO: 验证成功后删除验证码。
        throw new UnsupportedOperationException("TODO: delete verification code");
    }

    public boolean canSend(String phoneCountryCode, String phone) {
        // TODO: 根据发送频率 Key 判断是否允许再次发送。
        throw new UnsupportedOperationException("TODO: check sms send interval");
    }

    public void markSent(
            String phoneCountryCode,
            String phone,
            long intervalSeconds
    ) {
        // TODO: 记录发送时间或发送频率限制 Key。
        throw new UnsupportedOperationException("TODO: mark sms as sent");
    }
}
