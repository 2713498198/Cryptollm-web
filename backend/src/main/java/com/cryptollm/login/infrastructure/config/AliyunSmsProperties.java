package com.cryptollm.login.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 阿里云短信服务配置。
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "cryptollm.sms.aliyun")
public class AliyunSmsProperties {

    /**
     * 阿里云 RAM AccessKey ID。
     */
    private String accessKeyId;

    /**
     * 阿里云 RAM AccessKey Secret。
     */
    private String accessKeySecret;

    /**
     * 阿里云短信签名名称。
     */
    private String signName;

    /**
     * 登录验证码模板码。
     */
    private String loginTemplateCode;

    /**
     * 修改密码验证码模板码。
     */
    private String changePasswordTemplateCode;

    /**
     * 阿里云地域 ID，例如 cn-hangzhou。
     */
    private String regionId;
}
