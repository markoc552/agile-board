package agile.central.model.dto;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.Date;
import java.util.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto implements Serializable {

    private String name;
    private Date estimated;
    private String ticket;
    private String assignee;
    private String reporter;
    private Integer priority;
    private String component;
    private String description;
    private String projectName;
    private Date createdAt;
}
