package agile.central.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.sql.*;

@Entity
@Table(name = "components")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComponentDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Name is required!")
    private String name;
    @NotNull(message = "Project name is required!")
    private String projectName;
}
