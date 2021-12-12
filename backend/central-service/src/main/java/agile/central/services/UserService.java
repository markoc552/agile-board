package agile.central.services;

import agile.central.aspects.*;
import agile.central.model.*;
import agile.central.model.dao.*;
import agile.central.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @Log
    public UserDetails loadUserByUsername(String username) {
        if (username == null)
            throw new SecurityException("Username can't be null!");

        Optional<UserDao> userDao = userRepository.findByUsername(username);

        if (userDao.isPresent()) {
            UserDao user = userDao.get();

            return getCustomUserDetails(user);
        }
        else {
            throw new SecurityException("User not found!");
        }
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
