package com.cryptollm.login.domain.convertor;

import com.cryptollm.login.domain.context.AccountLoginContext;
import com.cryptollm.login.domain.context.ChangePasswordContext;
import com.cryptollm.login.domain.context.PhoneLoginContext;
import com.cryptollm.login.domain.context.SendVerificationCodeContext;
import com.cryptollm.login.param.AccountLoginParamVO;
import com.cryptollm.login.param.ChangePasswordParamVO;
import com.cryptollm.login.param.PhoneLoginParamVO;
import com.cryptollm.login.param.SendVerificationCodeParamVO;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;

/**
 * 登录模块请求参数与领域上下文转换器。
 */
@Mapper(
        componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface AuthConvertor {

    SendVerificationCodeContext toContext(SendVerificationCodeParamVO paramVO);

    PhoneLoginContext toContext(PhoneLoginParamVO paramVO);

    AccountLoginContext toContext(AccountLoginParamVO paramVO);

    ChangePasswordContext toContext(ChangePasswordParamVO paramVO);
}
