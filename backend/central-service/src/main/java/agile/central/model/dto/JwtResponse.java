package agile.central.model.dto;

import lombok.*;

import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtResponse implements Serializable {

    private String token;
}
