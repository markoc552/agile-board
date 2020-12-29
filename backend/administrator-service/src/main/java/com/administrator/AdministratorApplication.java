package com.administrator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.retry.annotation.*;
import org.springframework.scheduling.annotation.*;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AdministratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministratorApplication.class, args);
    }

}
