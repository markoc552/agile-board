package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
@Component
public interface FileHashRepository extends CrudRepository<FileHashDao, String> {

    Optional<FileHashDao> findByFilename(String filename);
}
