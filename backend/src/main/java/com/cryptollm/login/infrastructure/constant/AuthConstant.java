package com.cryptollm.login.infrastructure.constant;

/**
 * 登录认证模块 Redis Key 与默认值。
 */
public final class AuthConstant {

    public static final String SMS_CODE_PREFIX = "cryptollm:auth:sms:";
    public static final String SMS_RESEND_PREFIX = "cryptollm:auth:sms:resend:";
    public static final String LOGIN_TOKEN_PREFIX = "cryptollm:auth:token:";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    private AuthConstant() {
    }
}
