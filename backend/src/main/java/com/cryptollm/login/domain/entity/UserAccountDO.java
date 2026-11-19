package com.cryptollm.login.domain.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cryptollm.common.data.domain.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 用户账号实体，对应 user_account 表。
 */
@Getter
@Setter
@TableName("user_account")
public class UserAccountDO extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 对外展示的雪花账号 ID，默认与内部主键保持一致。
     */
    @TableField("account_no")
    private String accountNo;

    /**
     * 登录用户名。
     */
    @TableField("username")
    private String username;

    /**
     * 用户显示名称。
     */
    @TableField("nickname")
    private String nickname;

    /**
     * 手机号国家或地区代码。
     */
    @TableField("phone_country_code")
    private String phoneCountryCode;

    /**
     * 手机号，不包含国家或地区代码。
     */
    @TableField("phone")
    private String phone;

    /**
     * 联系邮箱，未绑定时为 null。
     */
    @TableField("email")
    private String email;

    /**
     * BCrypt/Argon2 等算法生成的密码哈希。
     */
    @TableField("password_hash")
    private String passwordHash;

    /**
     * 用户头像地址。
     */
    @TableField("avatar_url")
    private String avatarUrl;

    /**
     * 账号类型：1-个人，2-企业。
     */
    @TableField("account_type")
    private Integer accountType;

    /**
     * 账号状态：1-正常，2-禁用，3-锁定。
     */
    @TableField("status")
    private Integer status;

    /**
     * 实名认证状态：0-未认证，1-认证中，2-已认证，3-认证失败。
     */
    @TableField("real_name_status")
    private Integer realNameStatus;

    /**
     * 是否开启双重认证。
     */
    @TableField("two_factor_enabled")
    private Boolean twoFactorEnabled;

    /**
     * 可用余额。
     */
    @TableField("balance")
    private BigDecimal balance;

    /**
     * 最后登录时间。
     */
    @TableField("last_login_time")
    private LocalDateTime lastLoginTime;

    /**
     * 最后登录 IP，兼容 IPv4 和 IPv6。
     */
    @TableField("last_login_ip")
    private String lastLoginIp;

    /**
     * 最近一次修改密码时间。
     */
    @TableField("password_updated_at")
    private LocalDateTime passwordUpdatedAt;
}
