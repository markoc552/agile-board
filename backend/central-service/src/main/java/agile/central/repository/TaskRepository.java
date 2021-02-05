package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface TaskRepository extends JpaRepository<TaskDao, Long> {

    Optional<TaskDao> findByName(String name);

    Optional<TaskDao> findByTicket(String ticket);

    Optional<List<TaskDao>> findByAssignee(String assignee);

    Optional<List<TaskDao>> findByProjectName(String projectName);

    Optional<List<TaskDao>> findBySprint(String name);
}
