package com.administrator.repository;

import com.administrator.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface ProjectsRepository extends JpaRepository<ProjectDao, Long> {

    Optional<ProjectDao> findByName(String name);

    Optional<List<ProjectDao>> findByManager(String manager);
}
