package com.cryptollm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/**
 * CryptoLLM 单体应用启动类。
 */
@MapperScan("com.cryptollm.login.infrastructure.mapper")
@ConfigurationPropertiesScan
@SpringBootApplication(scanBasePackages = "com.cryptollm")
public class CryptoLlmApplication {

    public static void main(String[] args) {
        SpringApplication.run(CryptoLlmApplication.class, args);
    }
}
