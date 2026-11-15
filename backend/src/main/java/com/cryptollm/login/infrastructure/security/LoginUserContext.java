package com.cryptollm.login.infrastructure.security;

/**
 * 当前请求的登录用户上下文。
 */
public final class LoginUserContext {

    private static final ThreadLocal<String> ACCOUNT_NO_HOLDER = new ThreadLocal<>();

    private LoginUserContext() {
    }

    public static void set(String accountNo) {
        ACCOUNT_NO_HOLDER.set(accountNo);
    }

    public static String get() {
        return ACCOUNT_NO_HOLDER.get();
    }

    public static void clear() {
        ACCOUNT_NO_HOLDER.remove();
    }
}
