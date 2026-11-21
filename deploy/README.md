# CryptoLLM 服务器快速部署

该方案使用一台 Linux 云服务器和 Docker Compose，部署：

- `web`：Next.js 前端
- `api`：Spring Boot 后端
- `mysql`：MySQL 8.4
- `redis`：Redis 7
- `caddy`：自动申请和续期 HTTPS 证书，并反向代理前后端

## 前置条件

1. `cryptollm.net` 和 `www.cryptollm.net` 的 DNS A 记录指向 `8.137.78.198`。
2. 阿里云安全组开放 `22`、`80`、`443`。
3. 服务器上占用 `80/443` 的旧服务已经停止。
4. 服务器已安装 Docker 和 Docker Compose Plugin。

Ubuntu 安装 Docker：

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

## 首次部署

```bash
cd /opt/cryptollm/app

cp deploy/.env.example deploy/.env
nano deploy/.env
chmod 600 deploy/.env

docker compose -f deploy/compose.yml build
docker compose -f deploy/compose.yml up -d
```

`deploy/.env` 中的数据库密码和 Redis 密码必须修改为强密码。

首次启动 MySQL 时会自动执行 `database/migrations` 下的 SQL 脚本。

## 阿里云 PNVS 短信认证配置

在 `deploy/.env` 中配置阿里云号码认证服务参数：

```dotenv
ALIYUN_SMS_ACCESS_KEY_ID=替换为RAM用户的AccessKeyId
ALIYUN_SMS_ACCESS_KEY_SECRET=替换为RAM用户的AccessKeySecret
ALIYUN_SMS_SIGN_NAME=恒创联众
ALIYUN_SMS_LOGIN_TEMPLATE_CODE=100001
ALIYUN_SMS_CHANGE_PASSWORD_TEMPLATE_CODE=100001
ALIYUN_SMS_REGION_ID=cn-hangzhou
```

阿里云 RAM 用户需要具备 `dypns:SendSmsVerifyCode` 权限，也可以临时使用
`AliyunDypnsFullAccess`。PNVS 使用平台预置签名和验证码模板，不需要申请企业签名与模板。

代码调用 `SendSmsVerifyCode`，模板参数为 `code` 和 `min`。当前平台模板
`100001` 的内容为：

```text
您的验证码为${code}。尊敬的客户，以上验证码${min}分钟内有效，请注意保密，切勿告知他人。
```

登录和修改密码可以共用该模板。AccessKey Secret 只能通过环境变量注入，不要提交到 Git。

## 检查服务

```bash
docker compose -f deploy/compose.yml ps
docker compose -f deploy/compose.yml logs -f caddy
curl -I https://cryptollm.net
```

Caddy 会在 DNS 生效且 `80/443` 可访问后自动申请 HTTPS 证书。

## 更新版本

```bash
cd /opt/cryptollm/app
git pull
docker compose -f deploy/compose.yml build
docker compose -f deploy/compose.yml up -d
```

## 数据备份

停止写入后备份 MySQL：

```bash
docker compose -f deploy/compose.yml exec -T mysql \
  mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" cryptollm \
  > cryptollm-$(date +%F-%H%M).sql
```

同时备份 Docker Volume：

```bash
docker run --rm \
  -v cryptollm_mysql_data:/data \
  -v "$PWD":/backup \
  alpine tar czf /backup/mysql-data-$(date +%F-%H%M).tar.gz -C /data .
```

## 注意事项

- 不要把 `3000`、`8080`、`3306`、`6379` 暴露到公网。
- `deploy/.env` 不要提交到 Git。
- 当前后端短信发送器、登录拦截器、账号登录和退出登录尚未完全实现，部署后官网可访问，但登录功能仍需继续接入。
