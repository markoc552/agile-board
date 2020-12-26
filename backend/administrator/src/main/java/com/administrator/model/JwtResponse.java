package com.administrator.model;

import lombok.*;

import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse implements Serializable {

    private String token;
}
