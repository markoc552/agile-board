package agile.administrator.model.dao;


import agile.administrator.util.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

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

    @OneToMany
    private List<UserDao> participants;

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
