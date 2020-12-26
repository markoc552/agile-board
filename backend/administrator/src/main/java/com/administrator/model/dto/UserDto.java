package com.administrator.model.dto;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {

    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String role;
}
