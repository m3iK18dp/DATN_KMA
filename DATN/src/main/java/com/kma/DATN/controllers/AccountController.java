package com.kma.DATN.controllers;

import com.kma.DATN.DTO.AccountRequestDto;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.services.IAccountService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    private final IAccountService accountService;


    @GetMapping()
    public ResponseObject<Page<AccountRequestDto>> getAccount(@RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
                                                              @RequestParam(value = "_user_id", defaultValue = "-1") String userId,
                                                              @RequestParam(value = "_page", defaultValue = "0") int page,
                                                              @RequestParam(value = "_limit", defaultValue = "10") int limit,
                                                              @RequestParam(value = "_field", defaultValue = "createdTime") String field,
                                                              @RequestParam(value = "_type_sort", defaultValue = "desc") String typeSort,
                                                              HttpServletRequest request
    ) {
        Page<AccountRequestDto> accounts = new PageImpl<>(new ArrayList<>(), PageRequest.of(0, 10), 0);
        try {
            accounts = accountService.findAccountsWithPaginationAndSort(accountNumber, userId, page, limit, field, typeSort, request);
            if (accounts.isEmpty()) {
                return new ResponseObject<>(
                        "failed",
                        "Not found Accounts.",
                        accounts
                );
            } else {
                return new ResponseObject<>(
                        "ok",
                        "Get All Successfully.",
                        accounts
                );
            }
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't get Accounts with filter. " + exception.getMessage(),
                    accounts
            );
        }
    }
}
