package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface ActivityRepository extends JpaRepository<ActivityDao, Long> {

    Optional<ActivityDao> findByProjectName(String projectName);

}
