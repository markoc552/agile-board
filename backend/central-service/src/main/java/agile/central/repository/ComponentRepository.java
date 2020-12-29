package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface ComponentRepository extends JpaRepository<ComponentDao, Long> {

    Optional<ComponentDao> findByName(String name);

    Optional<List<ComponentDao>> findByProjectName(String projectName);
}
