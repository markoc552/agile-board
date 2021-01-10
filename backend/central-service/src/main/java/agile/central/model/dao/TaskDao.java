package agile.central.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.Date;
import java.util.*;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Task name is mandatory!")
    private String name;
    @NotNull(message = "Task key is mandatory!")
    private String keyword;
    @NotNull(message = "Assignee is mandatory!")
    private String assignee;
    @NotNull(message = "Priority is required!")
    private Integer priority;
    @NotNull(message = "Description is required!")
    private String description;
    private Date estimated;
    @NotNull(message = "Reported is required!")
    private String reporter;


    private List<TaskDao> subTasks;



}
