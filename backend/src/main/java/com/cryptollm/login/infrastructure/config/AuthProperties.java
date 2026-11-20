package com.cryptollm.login.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 登录模块可配置参数。
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "cryptollm.auth")
public class AuthProperties {

    private long smsCodeExpireSeconds;
    private long smsResendIntervalSeconds;
    private long tokenExpireSeconds;
    private String corsAllowedOrigin;
}
