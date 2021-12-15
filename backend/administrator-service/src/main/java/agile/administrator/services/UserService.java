package agile.administrator.services;


import agile.administrator.aspects.*;
import agile.administrator.exceptions.*;
import agile.administrator.model.*;
import agile.administrator.model.dao.*;
import agile.administrator.model.dto.*;
import agile.administrator.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.stereotype.*;

import java.util.*;

import static agile.administrator.util.AdministratorConstants.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Log
    public UserDetails loadUserByUsername(String username) {
        if (username == null)
            throw new SecurityException(USERNAME_CAN_T_BE_NULL);

        Optional<UserDao> userDao = userRepository.findByUsername(username);

        if (userDao.isPresent()) {
            UserDao user = userDao.get();

            return getCustomUserDetails(user);
        } else {
            throw new SecurityException(USER_NOT_EXISTS);
        }
    }

    @Log
    public UserDao createUser(UserDto userDto) throws UserAlreadyExistsException {
        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byUsername.isPresent())
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS);

        saveUserCredentials(userDto);

        return persistUser(userDto, new UserDao());
    }

    @Log
    public UserDao updateUser(UserDto userDto) throws UserNotFoundException {
        Optional<UserDao> userDao = userRepository.findByUsername(userDto.getUsername());

        if (userDao.isPresent()) {
            return persistUser(userDto, userDao.get());
        } else {
            throw new UserNotFoundException(USER_NOT_EXISTS);
        }
    }

    @Log
    public void deleteUser(UserDto userDto) throws UserNotFoundException {
        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byUsername.isPresent()) {
            UserDao userDao = byUsername.get();

            userRepository.delete(userDao);
        } else {
            throw new UserNotFoundException(USER_NOT_EXISTS);
        }
    }

    @Log
    public void changePassword(String username, @LogIgnore String password) throws UserNotFoundException {
        Optional<UserCredentialsDao> userCredentials = userCredentialsRepository.findByUsername(username);

        if (userCredentials.isPresent()) {
            UserCredentialsDao userCredentialsDao = userCredentials.get();

            userCredentialsDao.setPassword(password);

            userCredentialsRepository.save(userCredentialsDao);
        } else
            throw new UserNotFoundException(USER_NOT_EXISTS);
    }

    @Log
    public UserCredentialsDao changeRole(String username, @LogIgnore String role) throws UserNotFoundException {
        Optional<UserCredentialsDao> byUsername = userCredentialsRepository.findByUsername(username);

        if (byUsername.isPresent()) {
            UserCredentialsDao credentials = byUsername.get();

            credentials.setRole(role);

            return userCredentialsRepository.save(credentials);
        } else {
            throw new UserNotFoundException(USER_NOT_EXISTS);
        }
    }

    @Log
    public List<ProjectDao> getProjectsByUser(String username) throws UserNotFoundException {
        Optional<UserDao> byUsername = userRepository.findByUsername(username);

        if (byUsername.isPresent())
            return byUsername.get().getEnrolledProjects();
        else
            throw new UserNotFoundException();
    }

    @Log
    public UserDao getUserByUsername(String username) throws UserNotFoundException {
        Optional<UserDao> byUsername = userRepository.findByUsername(username);

        if (byUsername.isPresent())
            return byUsername.get();
        else
            throw new UserNotFoundException(USER_NOT_EXISTS);
    }

    @Log
    public List<UserDao> getAllUsers() {
        List<UserDao> allUserDaos = userRepository.findAll();

        for (UserDao userDao : allUserDaos) {
            Optional<UserCredentialsDao> userCredentials = userCredentialsRepository.findByUsername(userDao.getUsername());

            userCredentials.ifPresent(userCredentialsDao -> userDao.setRole(userCredentialsDao.getRole()));
        }

        return allUserDaos;
    }

    @Log
    public UserCredentialsDao getCredentialsByUsername(String username) throws UserNotFoundException {
        Optional<UserCredentialsDao> byUsername = userCredentialsRepository.findByUsername(username);

        if (byUsername.isPresent())
            return byUsername.get();
        else
            throw new UserNotFoundException(USER_NOT_EXISTS);
    }

    @Log
    private void saveUserCredentials(UserDto userDto) {
        UserCredentialsDao userCredentials = new UserCredentialsDao();

        userCredentials.setUsername(userDto.getUsername());
        userCredentials.setPassword(encoder.encode(userDto.getPassword()));
        userCredentials.setRole(userDto.getRole());

        userCredentialsRepository.save(userCredentials);
    }

    @Log
    public UserDao persistUser(UserDto userDto, UserDao userDao) {
        userDao.setUsername(userDto.getUsername());
        userDao.setFirstname(userDto.getFirstname());
        userDao.setLastname(userDto.getLastname());
        userDao.setEmail(userDto.getEmail());

        return userRepository.save(userDao);
    }

    @Log
    public void enrollUserToProject(UserDao userDao, ProjectDao projectDao) {
        userDao.getEnrolledProjects().add(projectDao);

        userRepository.save(userDao);
    }

    public UserDao getUserDao(UserDto userDto) {
        UserDao userDao = new UserDao();

        userDao.setUsername(userDto.getUsername());
        userDao.setFirstname(userDto.getFirstname());
        userDao.setLastname(userDto.getLastname());
        userDao.setEmail(userDto.getEmail());

        return userDao;
    }

    private CustomUserDetails getCustomUserDetails(UserDao user) {
        Optional<UserCredentialsDao> userCredentials = userCredentialsRepository.findByUsername(user.getUsername());

        if (userCredentials.isPresent()) {
            user.setCredentials(userCredentials.get());

            return new CustomUserDetails(user);
        }
        return null;
    }
}
