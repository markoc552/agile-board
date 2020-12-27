package com.administrator.config;

import com.administrator.exceptions.*;
import com.administrator.model.dao.*;
import com.administrator.services.*;
import lombok.*;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.util.matcher.*;
import org.springframework.stereotype.*;

import javax.servlet.http.*;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public AuthenticationFilter() {
        super.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/v1/jwt/authenticate", "POST"));
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        String username = request.getParameter("username");

        System.out.println(username);

        return super.attemptAuthentication(request, response);
    }
}
