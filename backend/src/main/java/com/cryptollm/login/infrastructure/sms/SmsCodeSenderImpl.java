package com.cryptollm.login.infrastructure.sms;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeRequest;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.cryptollm.login.domain.enums.VerificationCodeScene;
import com.cryptollm.login.infrastructure.config.AuthProperties;
import com.cryptollm.login.infrastructure.config.AliyunSmsProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Map;

/**
 * 基于阿里云号码认证服务 PNVS 的验证码发送器。
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SmsCodeSenderImpl implements SmsCodeSender {

    /**
     * 阿里云短信配置。
     */
    private final AliyunSmsProperties properties;

    /**
     * 用于安全生成短信模板参数 JSON。
     */
    private final ObjectMapper objectMapper;

    /**
     * 登录模块配置，用于同步短信模板中的验证码有效期。
     */
    private final AuthProperties authProperties;

    @Override
    public void send(
            String phoneCountryCode,
            String phone,
            String verificationCode,
            VerificationCodeScene scene
    ) {
        // 检查国家或地区代码是否为空。
        if (!StringUtils.hasText(phoneCountryCode)) {
            // 如果国家或地区代码为空，则拒绝发送。
            throw new IllegalArgumentException("手机号国家或地区代码不能为空");
        }

        // 检查手机号是否为空。
        if (!StringUtils.hasText(phone)) {
            // 如果手机号为空，则拒绝发送。
            throw new IllegalArgumentException("手机号不能为空");
        }

        // 检查验证码是否为空。
        if (!StringUtils.hasText(verificationCode)) {
            // 如果验证码为空，则拒绝发送。
            throw new IllegalArgumentException("短信验证码不能为空");
        }

        // 检查验证码使用场景是否为空。
        if (scene == null) {
            // 如果场景为空，则无法选择短信模板。
            throw new IllegalArgumentException("验证码使用场景不能为空");
        }

        // 校验阿里云 AccessKey ID 是否已经配置。
        validateConfiguration(properties.getAccessKeyId(), "阿里云短信 AccessKey ID");
        // 校验阿里云 AccessKey Secret 是否已经配置。
        validateConfiguration(properties.getAccessKeySecret(), "阿里云短信 AccessKey Secret");
        // 校验阿里云短信签名是否已经配置。
        validateConfiguration(properties.getSignName(), "阿里云短信签名");
        // 校验阿里云地域 ID 是否已经配置。
        validateConfiguration(properties.getRegionId(), "阿里云短信地域 ID");

        // 根据验证码场景选择对应的阿里云短信模板。
        String templateCode = resolveTemplateCode(scene);

        // 将国家或地区代码规范化为纯数字格式。
        String countryCode = normalizeCountryCode(phoneCountryCode);

        // 将手机号规范化为纯数字格式。
        String phoneNumber = phone.replaceAll("[^0-9]", "");

        // 根据 Redis 验证码有效期计算短信模板需要显示的分钟数。
        long validMinutes = Math.max(
                1L,
                (authProperties.getSmsCodeExpireSeconds() + 59L) / 60L
        );

        // 创建短信模板参数映射，PNVS 模板要求 code 和 min 两个变量。
        Map<String, String> templateParameters = Map.of(
                "code", verificationCode,
                "min", String.valueOf(validMinutes)
        );

        // 声明用于保存模板参数 JSON 的变量。
        String templateParam;
        try {
            // 使用 Jackson 生成安全的 JSON，避免手动拼接造成格式错误。
            templateParam = objectMapper.writeValueAsString(templateParameters);
        } catch (JsonProcessingException exception) {
            // 如果模板参数序列化失败，则抛出运行时异常。
            throw new IllegalStateException("短信模板参数序列化失败", exception);
        }

        // 使用配置中的地域、AccessKey ID 和 AccessKey Secret 创建 PNVS 客户端配置。
        DefaultProfile profile = DefaultProfile.getProfile(
                properties.getRegionId(),
                properties.getAccessKeyId(),
                properties.getAccessKeySecret()
        );

        // 使用客户端配置创建阿里云 OpenAPI 客户端。
        IAcsClient client = new DefaultAcsClient(profile);

        // 创建 PNVS 发送短信验证码请求。
        SendSmsVerifyCodeRequest request = new SendSmsVerifyCodeRequest();
        // 设置接收短信的纯数字手机号。
        request.setPhoneNumber(phoneNumber);
        // 设置手机号国家或地区代码，例如中国大陆为 86。
        request.setCountryCode(countryCode);
        // 设置阿里云平台提供的免资质短信签名。
        request.setSignName(properties.getSignName());
        // 设置登录模块当前场景对应的 PNVS 短信模板码。
        request.setTemplateCode(templateCode);
        // 设置包含验证码和有效分钟的模板参数 JSON。
        request.setTemplateParam(templateParam);
        // 设置 PNVS 所在阿里云地域。
        request.setSysRegionId(properties.getRegionId());
        // 明确设置 PNVS OpenAPI Endpoint，避免 SDK 解析到错误服务地址。
        request.setSysEndpoint("dypnsapi.aliyuncs.com");
        // 将验证码用途写入阿里云外部流水号，便于后续问题排查。
        request.setOutId(scene.name());

        // 声明 PNVS 短信发送响应对象。
        SendSmsVerifyCodeResponse response;
        try {
            // 调用 PNVS SendSmsVerifyCode 接口并等待响应。
            response = client.getAcsResponse(request);
        } catch (ClientException exception) {
            // 记录不包含 AccessKey 和验证码的错误日志。
            log.error("调用阿里云短信接口失败，验证码场景：{}", scene, exception);
            // 将阿里云客户端异常转换为运行时异常，交给业务层处理。
            throw new IllegalStateException("调用阿里云短信接口失败", exception);
        }

        // 检查阿里云是否返回了响应体。
        if (response == null) {
            // 如果没有响应体，则无法确认短信是否发送成功。
            throw new IllegalStateException("阿里云短信接口返回结果为空");
        }

        // 检查 PNVS 是否返回成功状态和 OK 状态码。
        if (!Boolean.TRUE.equals(response.getSuccess())
                || !"OK".equals(response.getCode())) {
            // 拼接不含敏感信息的阿里云错误信息。
            String errorMessage = "阿里云短信发送失败，code=%s，message=%s"
                    .formatted(response.getCode(), response.getMessage());
            // 记录阿里云返回的业务错误。
            log.error("{}，验证码场景：{}", errorMessage, scene);
            // 将业务失败转换为运行时异常，使上层删除 Redis 验证码。
            throw new IllegalStateException(errorMessage);
        }

        // 记录发送成功日志，不记录完整手机号和验证码。
        log.info(
                "阿里云 PNVS 短信发送成功，验证码场景：{}，BizId：{}",
                scene,
                response.getModel() == null ? null : response.getModel().getBizId()
        );
    }

    private String resolveTemplateCode(VerificationCodeScene scene) {
        // 如果是登录验证码场景，则使用登录模板。
        if (scene == VerificationCodeScene.LOGIN) {
            // 校验登录短信模板码已经配置。
            validateConfiguration(
                    properties.getLoginTemplateCode(),
                    "阿里云登录验证码模板码"
            );
            // 返回登录短信模板码。
            return properties.getLoginTemplateCode();
        }

        // 如果是修改密码验证码场景，则使用修改密码模板。
        if (scene == VerificationCodeScene.CHANGE_PASSWORD) {
            // 校验修改密码短信模板码已经配置。
            validateConfiguration(
                    properties.getChangePasswordTemplateCode(),
                    "阿里云修改密码验证码模板码"
            );
            // 返回修改密码短信模板码。
            return properties.getChangePasswordTemplateCode();
        }

        // 如果新增了场景但没有配置对应模板，则拒绝发送。
        throw new IllegalArgumentException("不支持的验证码场景：" + scene);
    }

    private String normalizeCountryCode(String phoneCountryCode) {
        // 去除国家或地区代码中的空格、加号和横线。
        String normalizedCountryCode = phoneCountryCode.replaceAll("[^0-9]", "");
        // 如果国家代码以 00 开头，则去掉国际长途前缀 00。
        if (normalizedCountryCode.startsWith("00")) {
            // 保留 00 后面的真实国家代码。
            normalizedCountryCode = normalizedCountryCode.substring(2);
        }
        // 返回 PNVS 要求的纯数字国家或地区代码。
        return normalizedCountryCode;
    }

    private void validateConfiguration(String value, String fieldName) {
        // 检查配置值是否为空或仅包含空白字符。
        if (!StringUtils.hasText(value)) {
            // 配置缺失时给出明确错误，不输出任何密钥内容。
            throw new IllegalStateException(fieldName + "未配置");
        }
    }
}
