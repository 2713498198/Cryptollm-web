package com.cryptollm.login.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 登录成功响应。
 */
@Getter
@Setter
public class LoginResVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String accountNo;
    private String username;
    private String nickname;
    private String token;
    private Long tokenExpiration;
    private boolean newUser;
    private LocalDateTime loginTime;
}
