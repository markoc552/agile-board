package agile.administrator.model.dto;


import lombok.*;

import javax.validation.constraints.*;
import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectDto implements Serializable {

    @NotNull
    private String name;
    @NotNull
    private String keyword;
    @NotNull
    private String manager;
}
