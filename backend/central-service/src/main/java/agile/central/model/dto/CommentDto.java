package agile.central.model.dto;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto implements Serializable {

    private String taskNumber;
    private String publisher;
    private String content;
    private Date publishTime;
}
