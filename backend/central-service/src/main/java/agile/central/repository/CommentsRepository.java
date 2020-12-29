package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface CommentsRepository extends JpaRepository<CommentDao, Long> {

    Optional<CommentDao> findByContent(String content);

    Optional<List<CommentDao>> findByTaskNumber(String taskNumber);

}
