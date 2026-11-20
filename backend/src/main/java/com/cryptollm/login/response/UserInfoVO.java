package com.cryptollm.login.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 当前用户信息响应。
 */
@Getter
@Setter
public class UserInfoVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String accountNo;
    private String username;
    private String nickname;
    private String phone;
    private String email;
    private String avatarUrl;
    private Integer accountType;
    private Integer realNameStatus;
    private Boolean twoFactorEnabled;
    private BigDecimal balance;
    private LocalDateTime gmtCreate;
}
