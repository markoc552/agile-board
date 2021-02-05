package agile.central.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.Date;
import java.util.*;

@Entity
@Table(name = "sprints")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SprintDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(name = "sprint_name")
    private String name;
    @Column(name = "sprint_from")
    @NotNull
    private Date from;
    @NotNull
    @Column(name = "sprint_to")
    private Date to;

    private String projectName;

    @OneToMany(mappedBy = "sprints", orphanRemoval = false)
    private List<TaskDao> tasks;
}
