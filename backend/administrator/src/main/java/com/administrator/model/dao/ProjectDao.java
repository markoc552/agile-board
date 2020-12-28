package com.administrator.model.dao;


import com.administrator.util.*;
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
    @NotNull(message = "Project name is required!")
    private String name;
    @Keyword
    @NotNull(message = "Project's keyword is required!")
    private String keyword;
    @NotNull(message = "Project needs to have a manager!")
    private String manager;

    @Override
    public String toString() {
        return "ProjectDao{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", keyword='" + keyword + '\'' +
                ", manager='" + manager + '\'' +
                '}';
    }
}
