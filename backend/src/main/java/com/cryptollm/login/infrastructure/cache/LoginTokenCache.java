package com.cryptollm.login.infrastructure.cache;

import com.cryptollm.login.infrastructure.constant.AuthConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 登录 Token 的 Redis 会话缓存。
 *
 * <p>Redis Key 使用 Token 的 SHA-256 摘要，Hash 仅保存账号标识和会话时间，
 * 用户资料与权限状态不进入会话缓存。</p>
 */
@Component
@RequiredArgsConstructor
public class LoginTokenCache {

    private static final RedisScript<Long> SAVE_SESSION_SCRIPT =
            new DefaultRedisScript<>(
                    """
                    redis.call(
                        'HSET', KEYS[1],
                        'accountNo', ARGV[1],
                        'issuedAt', ARGV[2],
                        'expiresAt', ARGV[3]
                    )
                    redis.call('EXPIRE', KEYS[1], ARGV[4])
                    return 1
                    """,
                    Long.class
            );

    private final StringRedisTemplate stringRedisTemplate;

    public void save(
            String token,
            String accountNo,
            long issuedAt,
            long expiresAt,
            long expireSeconds
    ) {
        if (!StringUtils.hasText(token)
                || !StringUtils.hasText(accountNo)
                || expireSeconds <= 0) {
            throw new IllegalArgumentException("登录会话参数不合法");
        }

        // 执行Lua脚本
        stringRedisTemplate.execute(
                SAVE_SESSION_SCRIPT,
                List.of(buildTokenKey(token)),
                accountNo,
                String.valueOf(issuedAt),
                String.valueOf(expiresAt),
                String.valueOf(expireSeconds)
        );
    }

    public String findAccountNo(String token) {
        if (!StringUtils.hasText(token)) {
            return null;
        }
        Object accountNo = stringRedisTemplate.opsForHash().get(
                buildTokenKey(token),
                "accountNo"
        );
        return accountNo == null ? null : accountNo.toString();
    }

    public Map<String, String> findSession(String token) {
        if (!StringUtils.hasText(token)) {
            return null;
        }
        Map<Object, Object> entries = stringRedisTemplate.opsForHash().entries(
                buildTokenKey(token)
        );
        if (entries.isEmpty()) {
            return null;
        }

        Map<String, String> sessionInfo = new LinkedHashMap<>();
        entries.forEach((key, value) ->
                sessionInfo.put(String.valueOf(key), String.valueOf(value))
        );
        return sessionInfo;
    }

    public void delete(String token) {
        if (!StringUtils.hasText(token)) {
            return;
        }
        stringRedisTemplate.delete(buildTokenKey(token));
    }

    private String buildTokenKey(String token) {
        // 原始 token 给前端，Redis 里存 sha256 后的哈希值
        return AuthConstant.LOGIN_TOKEN_PREFIX + sha256(token);
    }

    private String sha256(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("当前运行环境不支持 SHA-256", exception);
        }
    }
}
