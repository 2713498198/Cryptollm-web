package com.cryptollm.login.infrastructure.security;

import com.cryptollm.login.infrastructure.cache.LoginTokenCache;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 登录 Token 校验拦截器骨架。
 */
@Component
@RequiredArgsConstructor
public class LoginAuthInterceptor implements HandlerInterceptor {

    private final LoginTokenCache loginTokenCache;

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }
        if (handlerMethod.hasMethodAnnotation(LoginIgnore.class)) {
            return true;
        }

        // TODO: 读取 Authorization 请求头、校验 Redis Token 并写入 LoginUserContext。
        throw new UnsupportedOperationException("TODO: authenticate request");
    }

    @Override
    public void afterCompletion(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            Exception exception
    ) {
        LoginUserContext.clear();
    }
}
