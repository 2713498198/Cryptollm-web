package com.cryptollm.login.exception;

import com.cryptollm.common.base.exception.BizException;
import com.cryptollm.common.base.exception.ErrorCode;

/**
 * 登录认证模块业务异常。
 */
public class AuthException extends BizException {

    public AuthException(ErrorCode errorCode) {
        super(errorCode);
    }

    public AuthException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
