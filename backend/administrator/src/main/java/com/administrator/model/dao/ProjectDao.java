package com.administrator.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String keyword;
    @NotNull
    private String manager;
}
