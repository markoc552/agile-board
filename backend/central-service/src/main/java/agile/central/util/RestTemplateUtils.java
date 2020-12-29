package agile.central.util;

import org.springframework.http.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.client.*;

public class RestTemplateUtils {

    private RestTemplateUtils() {
        //private constructor
    }

    public static UserDetails fetchUserDetails() {

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<UserDetails> result = restTemplate.getForEntity("http://localhost:9000" + "/getUser", UserDetails.class);

        if (result.hasBody())
            return result.getBody();
        else
            return null;
    }
}
