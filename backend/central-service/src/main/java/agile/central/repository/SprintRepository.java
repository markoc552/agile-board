package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface SprintRepository extends JpaRepository<SprintDao, Long> {

    Optional<SprintDao> findByName(String name);

    Optional<SprintDao> findByProjectName(String name);
}
