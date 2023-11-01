package com.kma.DATN.services;//package com.kma.DATN.services;

import com.kma.DATN.DTO.AccountRequestDto;
import com.kma.DATN.models.Account;
import com.kma.DATN.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface IAccountService {

    User extractUser(HttpServletRequest request);

    AccountRequestDto createAccount(User user);


    Account createAccountWhenCreate(User user);

    Page<AccountRequestDto> findAccountsWithPaginationAndSort(
            String accountNumber,
            String userId,
            int page,
            int limit,
            String field,
            String typeSort,
            HttpServletRequest request);
}
