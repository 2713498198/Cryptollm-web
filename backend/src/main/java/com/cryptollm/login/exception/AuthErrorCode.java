package com.cryptollm.login.exception;

import com.cryptollm.common.base.exception.ErrorCode;
import lombok.Getter;

/**
 * 登录认证模块错误码。
 */
@Getter
public enum AuthErrorCode implements ErrorCode {

    SMS_CODE_SEND_FAILED("SMS_CODE_SEND_FAILED", "验证码发送失败"),
    SMS_CODE_SEND_TOO_FREQUENT("SMS_CODE_SEND_TOO_FREQUENT", "验证码发送过于频繁"),
    VERIFICATION_CODE_WRONG("VERIFICATION_CODE_WRONG", "验证码错误或已过期"),
    ACCOUNT_OR_PASSWORD_WRONG("ACCOUNT_OR_PASSWORD_WRONG", "账号或密码错误"),
    ACCOUNT_STATUS_IS_NOT_ACTIVE("ACCOUNT_STATUS_IS_NOT_ACTIVE", "账号状态不可用"),
    USER_NOT_LOGIN("USER_NOT_LOGIN", "用户未登录"),
    USER_NOT_EXIST("USER_NOT_EXIST", "用户不存在"),
    PASSWORD_CHANGE_FAILED("PASSWORD_CHANGE_FAILED", "密码修改失败");

    private final String code;
    private final String message;

    AuthErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
