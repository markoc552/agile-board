package agile.central.model.dto;


import lombok.*;

import java.io.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ComponentDto implements Serializable {

    private String name;
    private String projectName;
}
