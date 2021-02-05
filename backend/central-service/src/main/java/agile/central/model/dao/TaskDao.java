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
    @Column(name = "task_id")
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
    @NotNull(message = "Created date is required!")
    private Date createdAt;
    private Date estimated;
    @NotNull(message = "Reported is required!")
    private String reporter;
    private String ticket;
    private String projectName;
    private String sprint;
    private String dndId;
    private String status;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private SprintDao sprints;
}
