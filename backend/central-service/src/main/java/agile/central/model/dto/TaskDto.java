package agile.central.model.dto;


import com.fasterxml.jackson.annotation.*;
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
@ToString
public class TaskDto implements Serializable {

    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date estimated;
    private String ticket;
    private String assignee;
    private String reporter;
    private Integer priority;
    private String component;
    private String description;
    private String projectName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    private String dndId;
}
