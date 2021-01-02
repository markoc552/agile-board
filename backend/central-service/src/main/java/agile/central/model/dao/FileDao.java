package agile.central.model.dao;


import lombok.*;
import org.springframework.data.redis.core.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("FileHash")
public class FileDao implements Serializable {

    private String filename;
    private String path;
}
