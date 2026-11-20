package com.cryptollm.login.controller;

import com.cryptollm.common.web.vo.Result;
import com.cryptollm.login.domain.convertor.AuthConvertor;
import com.cryptollm.login.domain.service.UserAccountService;
import com.cryptollm.login.param.ChangePasswordParamVO;
import com.cryptollm.login.response.UserInfoVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 当前用户账号设置接口。
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserAccountController {

    private final UserAccountService userAccountService;
    private final AuthConvertor authConvertor;

    @GetMapping("/me")
    public Result<UserInfoVO> getCurrentUser() {
        return Result.success(userAccountService.getCurrentUserInfo());
    }

    @PutMapping("/password")
    public Result<Void> changePassword(
            @Valid @RequestBody ChangePasswordParamVO paramVO
    ) {
        userAccountService.changePassword(authConvertor.toContext(paramVO));
        return Result.success();
    }
}
