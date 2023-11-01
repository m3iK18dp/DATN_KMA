package com.kma.DATN.DTO;


import com.kma.DATN.models.Role;
import com.kma.DATN.models.User;
import com.kma.DATN.models.UserStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserRequestDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private Role role;
    //    private String avatar;
    private UserStatus status;
    private LocalDateTime createdTime;
    private LocalDateTime lastUpdated;


    public UserRequestDto(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.status = user.getStatus();
        this.role = user.getRole();
//        this.avatar = user.getAvatar();
        this.createdTime = user.getCreatedTime();
        this.lastUpdated = user.getLastUpdated();
    }

    public static Page<UserRequestDto> fromUsers(Page<User> users, Pageable pageable) {
        return new PageImpl<>(
                users.getContent()
                        .stream()
                        .map(UserRequestDto::new)
                        .collect(Collectors.toList()
                        ),
                pageable,
                users.getTotalElements()
        );
    }
}
