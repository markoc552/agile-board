package com.administrator.controller;


import com.administrator.exceptions.*;
import com.administrator.model.dao.*;
import com.administrator.model.dto.*;
import com.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static com.administrator.util.AgileAdminConstants.USERNAME_CAN_T_BE_NULL;
import static com.administrator.util.AgileAdminConstants.USER_CAN_T_BE_NULL;

@RestController
@CrossOrigin("*")
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@RequestBody UserDto userDto) throws RequestException, UserAlreadyExistsException {

        if (userDto == null)
            throw new RequestException(USER_CAN_T_BE_NULL);

        UserDao userDao = userService.createUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@RequestBody UserDto userDto) throws RequestException, UserNotFoundException {

        if (userDto == null)
            throw new RequestException(USER_CAN_T_BE_NULL);

        UserDao userDao = userService.updateUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/deleteUser")
    public ResponseEntity<Object> deleteUser(@RequestBody UserDto userDto) throws RequestException, UserNotFoundException {

        if (userDto == null)
            throw new RequestException(USER_CAN_T_BE_NULL);

        userService.deleteUser(userDto);

        return ResponseEntity.ok("User successfully");
    }

    @GetMapping("/getUser")
    public ResponseEntity<Object> getUser(@RequestParam(name = "username") String username) throws RequestException, UserNotFoundException {

        if (username == null)
            throw new RequestException(USERNAME_CAN_T_BE_NULL);

        UserDao user = userService.getUserByUsername(username);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/getUserCredentials")
    public ResponseEntity<Object> getUserCredentials(@RequestParam(name = "username") String username) throws RequestException, UserNotFoundException {

        if (username == null)
            throw new RequestException(USERNAME_CAN_T_BE_NULL);

        UserCredentialsDao credentials = userService.getCredentialsByUsername(username);

        return ResponseEntity.ok(credentials);
    }
}
