package agile.central.util;

import agile.central.model.*;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.client.*;
import org.springframework.web.util.*;

import java.util.*;

public class RestTemplateUtils {

    private RestTemplateUtils() {
        //private constructor
    }

    public static UserDetails authenticateUser(String username) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("http://localhost:9000/v1/user/getUser").queryParam("username", username);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        HttpEntity<CustomUserDetails> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                CustomUserDetails.class);

        if (response.hasBody())
            return response.getBody();
        else
            return null;
    }
}
