package com.cryptollm.login.infrastructure.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

/**
 * 登录 Token 的 Redis 缓存。
 */
@Component
@RequiredArgsConstructor
public class LoginTokenCache {

    private final StringRedisTemplate stringRedisTemplate;

    public void save(
            String token,
            String accountNo,
            long expireSeconds
    ) {
        // TODO: 保存 Token 与账号映射并设置过期时间。
        throw new UnsupportedOperationException("TODO: save login token");
    }

    public String findAccountNo(String token) {
        // TODO: 根据 Token 查询当前登录账号。
        throw new UnsupportedOperationException("TODO: find login token");
    }

    public void delete(String token) {
        // TODO: 删除登录 Token。
        throw new UnsupportedOperationException("TODO: delete login token");
    }
}
