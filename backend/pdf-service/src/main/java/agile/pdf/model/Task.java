package agile.pdf.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    private String ticket;
    private String name;
    private Integer priority;
    private String component;
}
