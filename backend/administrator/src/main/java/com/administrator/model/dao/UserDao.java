package com.administrator.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String username;
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @NotNull
    @Email
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "credential_id", referencedColumnName = "id")
    private UserCredentialsDao credentials;

    public String toString() {
        return "UserDao{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
