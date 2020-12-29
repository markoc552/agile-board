package agile.central.model.dto;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto implements Serializable {

    private String name;
    private String keyword;
    private String assignee;
    private Integer priority;
    private String description;
}
