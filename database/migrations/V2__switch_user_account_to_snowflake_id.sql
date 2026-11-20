-- 将 user_account 切换到 NetworkDisk 风格的雪花 ID 方案。
-- 适用数据库：MySQL 8.0.16+

USE `cryptollm`;

-- 内部主键改由应用层雪花算法赋值，不再使用数据库自增。
ALTER TABLE `user_account`
  MODIFY COLUMN `id` bigint NOT NULL COMMENT '内部雪花主键，不直接暴露给前端',
  MODIFY COLUMN `account_no` varchar(20) NOT NULL COMMENT '对外展示的雪花账号 ID，由后端生成';

-- 兼容已有 18 位账号，同时允许当前雪花算法生成的 19 位账号 ID。
ALTER TABLE `user_account`
  DROP CHECK `chk_user_account_no`;

ALTER TABLE `user_account`
  ADD CONSTRAINT `chk_user_account_no`
    CHECK (`account_no` REGEXP '^[0-9]{18,20}$');
