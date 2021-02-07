package agile.central.config;

import agile.central.exceptions.*;
import agile.central.services.*;
import lombok.*;
import org.javatuples.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;
import org.springframework.web.filter.*;

import javax.servlet.*;
import javax.servlet.http.*;

import static agile.central.util.RestTemplateUtils.authenticateUser;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private UserService userService;

    public static final Logger LOG = LoggerFactory.getLogger(JwtRequestFilter.class);


    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) {

        String requestToken = httpServletRequest.getHeader("Authorization");

        Pair<String, String> parsedToken = parseToken(requestToken);

        if (parsedToken.getValue0() != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userService.loadUserByUsername(parsedToken.getValue0());

            if (jwtToken.validateToken(parsedToken.getValue1(), userDetails)) {

                UsernamePasswordAuthenticationToken userPasswordAuthToken = jwtToken.getUserPasswordAuthToken(userDetails);

                userPasswordAuthToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(userPasswordAuthToken);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private Pair<String,String> parseToken(String requestToken) throws JwtAuthenticationException {

        String username;
        String token;

        if (requestToken != null && requestToken.startsWith("Bearer")) {

            token = requestToken.substring(7);
            username = jwtToken.getUsernameFromToken(token);

            return new Pair<>(username, token);

        }
        return new Pair<>(null, null);
    }


}
