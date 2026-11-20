package com.cryptollm.login.domain.context;

import lombok.Getter;
import lombok.Setter;

/**
 * 账号密码登录领域上下文。
 */
@Getter
@Setter
public class AccountLoginContext {

    private String account;
    private String password;
    private boolean rememberMe;
}
