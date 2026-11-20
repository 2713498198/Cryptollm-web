package com.cryptollm.login.controller;

import com.cryptollm.common.web.vo.Result;
import com.cryptollm.login.domain.convertor.AuthConvertor;
import com.cryptollm.login.domain.service.AuthService;
import com.cryptollm.login.infrastructure.security.LoginIgnore;
import com.cryptollm.login.param.AccountLoginParamVO;
import com.cryptollm.login.param.PhoneLoginParamVO;
import com.cryptollm.login.param.SendVerificationCodeParamVO;
import com.cryptollm.login.response.LoginResVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 登录认证控制器。
 *
 * <p>提供短信验证码发送、手机号登录、账号密码登录和退出登录接口。
 * 当前所有接口只完成参数接收与领域服务调用框架，具体认证逻辑仍由
 * {@link AuthService} 的 TODO 实现补充。</p>
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthConvertor authConvertor;

    /**
     * 发送手机短信验证码。
     *
     * <p>接口地址：{@code POST /api/v1/auth/sms-code}</p>
     *
     * <p>调用方通过 {@code scene} 指定验证码用途：
     * {@code LOGIN} 用于手机号登录，{@code CHANGE_PASSWORD} 用于修改密码。
     * 该接口无需登录，后续实现时需要处理发送频率限制、验证码生成、
     * Redis 存储以及短信渠道调用。</p>
     *
     * @param paramVO 手机号、国家或地区代码和验证码使用场景
     * @return 验证码发送成功后的统一响应，不向前端返回真实验证码
     */
    @LoginIgnore
    @PostMapping("/sms-code")
    public Result<Void> sendVerificationCode(
            @Valid @RequestBody SendVerificationCodeParamVO paramVO
    ) {
        authService.sendVerificationCode(authConvertor.toContext(paramVO));
        return Result.success();
    }

    /**
     * 使用手机号和短信验证码登录。
     *
     * <p>接口地址：{@code POST /api/v1/auth/login/phone}</p>
     *
     * <p>该接口同时承担手机号注册和登录：手机号未注册时自动创建用户账号，
     * 已注册时直接登录。验证成功后返回登录 Token 和基础用户信息。
     * 该接口无需登录，后续实现时需要校验验证码、账号状态和登录 Token。</p>
     *
     * @param paramVO 手机号、国家或地区代码、验证码和是否记住登录状态
     * @return 登录 Token、过期时间、账号信息和是否为新用户
     */
    @LoginIgnore
    @PostMapping("/login/phone")
    public Result<LoginResVO> phoneLogin(
            @Valid @RequestBody PhoneLoginParamVO paramVO
    ) {
        LoginResVO response = authService.phoneLogin(authConvertor.toContext(paramVO));
        return Result.success(response);
    }

    /**
     * 使用用户名、邮箱或手机号加密码登录。
     *
     * <p>接口地址：{@code POST /api/v1/auth/login/account}</p>
     *
     * <p>当前前端已经提供账号登录界面，但后端认证逻辑尚未实现。
     * 后续需要根据 {@code account} 自动识别登录类型，校验 BCrypt 密码哈希、
     * 账号状态，并签发登录 Token。</p>
     *
     * @param paramVO 用户名、邮箱或手机号，密码和是否记住登录状态
     * @return 登录 Token、过期时间和基础账号信息
     */
    @LoginIgnore
    @PostMapping("/login/account")
    public Result<LoginResVO> accountLogin(
            @Valid @RequestBody AccountLoginParamVO paramVO
    ) {
        LoginResVO response = authService.accountLogin(authConvertor.toContext(paramVO));
        return Result.success(response);
    }

    /**
     * 退出当前登录账号。
     *
     * <p>接口地址：{@code POST /api/v1/auth/logout}</p>
     *
     * <p>调用方需要在 {@code Authorization} 请求头中携带登录 Token。
     * 后续实现时从 Redis 删除 Token 及其账号映射，使当前会话立即失效。
     * 该接口不能通过 {@code @LoginIgnore} 跳过登录校验。</p>
     *
     * @param authorization 当前登录用户的 Token，当前接口框架允许为空，具体实现时由拦截器统一校验
     * @return 退出成功后的统一响应
     */
    @PostMapping("/logout")
    public Result<Void> logout(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        authService.logout(authorization);
        return Result.success();
    }
}
