package com.cryptollm.common.web.vo;

import com.cryptollm.common.base.exception.ErrorCode;
import lombok.Getter;
import lombok.Setter;

import static com.cryptollm.common.base.response.ResponseCode.SUCCESS;

/**
 * 统一 Web 返回结构。
 */
@Getter
@Setter
public class Result<T> {

    private String code;
    private Boolean success;
    private String message;
    private T data;

    public static <T> Result<T> success() {
        Result<T> result = new Result<>();
        result.setCode(SUCCESS.name());
        result.setSuccess(true);
        result.setMessage(SUCCESS.name());
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = success();
        result.setData(data);
        return result;
    }

    public static <T> Result<T> error(ErrorCode errorCode) {
        Result<T> result = new Result<>();
        result.setCode(errorCode.getCode());
        result.setSuccess(false);
        result.setMessage(errorCode.getMessage());
        return result;
    }
}
