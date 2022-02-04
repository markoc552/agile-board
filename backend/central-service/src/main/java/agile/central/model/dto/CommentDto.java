package agile.central.model.dto;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDto implements Serializable {

    private String taskNumber;
    private String publisher;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date publishTime;


}
