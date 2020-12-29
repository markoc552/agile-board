package agile.central.model.dto;


import lombok.*;

import java.io.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComponentDto implements Serializable {

    private String name;
    private String projectName;
}
