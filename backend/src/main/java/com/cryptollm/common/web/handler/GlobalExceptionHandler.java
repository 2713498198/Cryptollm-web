package com.cryptollm.common.web.handler;

import com.cryptollm.common.base.exception.BizException;
import com.cryptollm.common.web.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.cryptollm.common.base.response.ResponseCode.ILLEGAL_ARGUMENT;
import static com.cryptollm.common.base.response.ResponseCode.SYSTEM_ERROR;

/**
 * Web 层统一异常处理。
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BizException.class)
    public Result<Void> handleBizException(BizException exception) {
        log.warn("业务异常: {}", exception.getMessage());
        return Result.error(exception.getErrorCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidationException(MethodArgumentNotValidException exception) {
        // TODO: 后续统一提取字段校验错误信息。
        throw new UnsupportedOperationException("TODO: handle request validation", exception);
    }

    @ExceptionHandler(UnsupportedOperationException.class)
    public Result<Void> handleTodoException(UnsupportedOperationException exception) {
        log.warn("功能尚未实现: {}", exception.getMessage());
        Result<Void> result = new Result<>();
        result.setCode(SYSTEM_ERROR.name());
        result.setMessage(exception.getMessage());
        result.setSuccess(false);
        return result;
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleUnknownException(Exception exception) {
        log.error("系统异常", exception);
        Result<Void> result = new Result<>();
        result.setCode(SYSTEM_ERROR.name());
        result.setMessage("系统异常");
        result.setSuccess(false);
        return result;
    }
}
