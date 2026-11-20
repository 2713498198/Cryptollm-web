package com.cryptollm.login.infrastructure.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cryptollm.login.domain.entity.UserAccountDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 用户账号数据访问接口。
 */
@Mapper
public interface UserAccountMapper extends BaseMapper<UserAccountDO> {

    UserAccountDO findByPhone(
            @Param("phoneCountryCode") String phoneCountryCode,
            @Param("phone") String phone
    );

    UserAccountDO findByAccountNo(@Param("accountNo") String accountNo);

    UserAccountDO findByUsername(@Param("username") String username);

    UserAccountDO findByEmail(@Param("email") String email);
}
