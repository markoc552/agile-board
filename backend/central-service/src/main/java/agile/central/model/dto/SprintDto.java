package agile.central.model.dto;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.io.*;
import java.util.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SprintDto implements Serializable {

    private String projectName;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date from;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date to;
    private List<TaskDto> tasks;
}
