package agile.central.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.*;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Task number is mandatory!")
    private String taskNumber;
    @NotNull(message = "Publisher is required!")
    private String publisher;
    @NotNull(message = "Content is required!")
    private String content;
    @NotNull(message = "Publish time is required!")
    private Date publishTime;
}
