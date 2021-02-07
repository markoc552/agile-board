package agile.administrator.controllers;


import agile.administrator.exceptions.*;
import agile.administrator.model.*;
import agile.administrator.model.dao.*;
import agile.administrator.model.dto.*;
import agile.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;

import java.util.*;

import static agile.administrator.util.AdministratorConstants.*;

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

    @GetMapping("/getUserInfo")
    public ResponseEntity<Object> getUserInformation(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserDao userByUsername = userService.getUserByUsername(username);

        return ResponseEntity.ok(userByUsername);
    }

    @GetMapping("/getUser")
    public ResponseEntity<Object> getUser(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserDetails userDetails = userService.loadUserByUsername(username);

        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {

        List<UserDao> allUsers = userService.getAllUsers();

        return ResponseEntity.ok(allUsers);
    }

    @GetMapping("/getUserCredentials")
    public ResponseEntity<Object> getUserCredentials(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.getCredentialsByUsername(username);

        return ResponseEntity.ok(credentials);
    }

    @GetMapping("/getAllProjectsByUser/{username}")
    public ResponseEntity<Object> getProjectsByUser(@NotNull @PathVariable("username") String username) throws UserNotFoundException {

        List<ProjectDao> allProjects = userService.getProjectsByUser(username);

        return ResponseEntity.ok(allProjects);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "password") String password,
                                                 @NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username ) throws UserNotFoundException {

        userService.changePassword(username, password);

        return ResponseEntity.ok("User password successfully changed!");
    }

    @PostMapping("/changeRole")
    public ResponseEntity<Object> changeRole(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username,
                                             @NotNull(message = ROLE_CAN_T_BE_NULL) @RequestParam(name = "role") String role) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.changeRole(username, role);

        return ResponseEntity.ok(credentials);
    }
}
