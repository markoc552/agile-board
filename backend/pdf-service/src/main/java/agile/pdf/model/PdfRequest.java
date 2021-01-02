package agile.pdf.model;


import lombok.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PdfRequest {


    private String sprintName;
    private List<Task> tasks;
    private String reporter;
    private String assignee;


}
