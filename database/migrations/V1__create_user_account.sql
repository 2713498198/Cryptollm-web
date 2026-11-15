-- CryptoLLM 用户主表
-- 适用数据库：MySQL 8.0.16+
-- 约定：
-- 1. 手机验证码、登录 Token、密码修改验证码存储在 Redis，不进入 MySQL。
-- 2. password_hash 只存储 BCrypt/Argon2 等算法生成后的哈希，禁止存储明文密码。
-- 3. 首次使用手机号登录时，password_hash 可以为 NULL；后续设置密码后写入哈希。

CREATE DATABASE IF NOT EXISTS `cryptollm`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE `cryptollm`;

CREATE TABLE IF NOT EXISTS `user_account` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '内部主键，不直接暴露给前端',
  `account_no` char(18) NOT NULL COMMENT '对外展示的 18 位账号 ID，由后端生成',
  `username` varchar(32) NOT NULL COMMENT '登录用户名，用于账号密码登录',
  `nickname` varchar(64) NOT NULL COMMENT '用户显示名称',
  `phone_country_code` varchar(8) NOT NULL DEFAULT '+86' COMMENT '手机号国家或地区代码',
  `phone` varchar(20) NOT NULL COMMENT '手机号，不包含国家或地区代码',
  `email` varchar(128) DEFAULT NULL COMMENT '联系邮箱，未绑定时为 NULL',
  `password_hash` varchar(255) DEFAULT NULL COMMENT '密码哈希；仅手机号首次登录时可为 NULL',
  `avatar_url` varchar(512) DEFAULT NULL COMMENT '头像地址',
  `account_type` tinyint NOT NULL DEFAULT 1 COMMENT '账号类型：1-个人，2-企业',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '账号状态：1-正常，2-禁用，3-锁定',
  `real_name_status` tinyint NOT NULL DEFAULT 0 COMMENT '实名状态：0-未认证，1-认证中，2-已认证，3-认证失败',
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否开启双重认证：0-否，1-是',
  `balance` decimal(18, 2) NOT NULL DEFAULT 0.00 COMMENT '可用余额，仅作为单体阶段的基础字段',
  `last_login_time` datetime(3) DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(45) DEFAULT NULL COMMENT '最后登录 IP，兼容 IPv4 和 IPv6',
  `password_updated_at` datetime(3) DEFAULT NULL COMMENT '最近一次修改密码时间',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  `lock_version` int NOT NULL DEFAULT 0 COMMENT 'MyBatis-Plus 乐观锁版本号',
  `gmt_create` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `gmt_modified` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_account_no` (`account_no`),
  UNIQUE KEY `uk_user_account_phone` (`phone_country_code`, `phone`),
  UNIQUE KEY `uk_user_account_username` (`username`),
  UNIQUE KEY `uk_user_account_email` (`email`),
  KEY `idx_user_account_status` (`status`, `deleted`),
  KEY `idx_user_account_gmt_create` (`gmt_create`),
  CONSTRAINT `chk_user_account_no`
    CHECK (`account_no` REGEXP '^[0-9]{18}$'),
  CONSTRAINT `chk_user_account_type`
    CHECK (`account_type` IN (1, 2)),
  CONSTRAINT `chk_user_account_status`
    CHECK (`status` IN (1, 2, 3)),
  CONSTRAINT `chk_user_account_real_name_status`
    CHECK (`real_name_status` IN (0, 1, 2, 3)),
  CONSTRAINT `chk_user_account_two_factor`
    CHECK (`two_factor_enabled` IN (0, 1)),
  CONSTRAINT `chk_user_account_deleted`
    CHECK (`deleted` IN (0, 1)),
  CONSTRAINT `chk_user_account_balance`
    CHECK (`balance` >= 0)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  COMMENT = '用户账号主表';
