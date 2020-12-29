package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface TaskRepository extends JpaRepository<TaskDao, Long> {

    Optional<TaskDao> findByName(String name);

    Optional<TaskDao> findByNumber(String number);

    Optional<List<TaskDao>> findByAssignee(String assignee);
}
