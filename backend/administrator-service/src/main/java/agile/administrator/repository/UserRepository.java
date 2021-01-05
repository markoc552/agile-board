package agile.administrator.repository;

import agile.administrator.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface UserRepository extends JpaRepository<UserDao, Long> {

    Optional<UserDao> findByUsername(String username);

    Optional<UserDao> findByEmail(String email);

    @Override
    List<UserDao> findAll();
}
