package com.administrator.controllers;


import com.administrator.exceptions.*;
import com.administrator.model.*;
import com.administrator.model.dao.*;
import com.administrator.model.dto.*;
import com.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;

import static com.administrator.util.AdministratorConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserAlreadyExistsException {

        UserDao userDao = userService.createUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {

        UserDao userDao = userService.updateUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/deleteUser")
    public ResponseEntity<Object> deleteUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {

        userService.deleteUser(userDto);

        return ResponseEntity.ok("User successfully deleted");
    }

    @GetMapping("/getUser")
    public ResponseEntity<Object> getUser(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserDao user = userService.getUserByUsername(username);

        CustomUserDetails userDetails = new CustomUserDetails(user);

        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("/getUserCredentials")
    public ResponseEntity<Object> getUserCredentials(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.getCredentialsByUsername(username);

        return ResponseEntity.ok(credentials);
    }

    @GetMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "password") String password,
                                                 @NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username ) throws UserNotFoundException {

        userService.changePassword(username, password);

        return ResponseEntity.ok("User password successfully changed!");
    }

    @GetMapping("/changeRole")
    public ResponseEntity<Object> changeRole(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username,
                                             @NotNull(message = ROLE_CAN_T_BE_NULL) @RequestParam(name = "role") String role) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.changeRole(username, role);

        return ResponseEntity.ok(credentials);
    }
}