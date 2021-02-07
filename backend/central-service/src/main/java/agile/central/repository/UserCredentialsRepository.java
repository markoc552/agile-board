package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface UserCredentialsRepository extends JpaRepository<UserCredentialsDao, Long> {

    Optional<UserCredentialsDao> findByUsername(String username);
}
