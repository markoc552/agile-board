package agile.central.repository;

import agile.central.model.dao.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
@Component
public interface FileRepository extends CrudRepository<FileDao, String> {

    Optional<FileDao> findByFilename(String filename);
}
