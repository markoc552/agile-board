package com.administrator.services;


import com.administrator.aspects.*;
import com.administrator.exceptions.*;
import com.administrator.model.dao.*;
import com.administrator.model.dto.*;
import com.administrator.repository.*;
import com.administrator.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

import static com.administrator.util.AgileAdminConstants.PROJECT_ALREADY_EXISTS;
import static com.administrator.util.AgileAdminConstants.PROJECT_NOT_EXISTS;

@Service
public class ProjectService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Log
    public ProjectDao createProject(ProjectDto project) throws ProjectAlreadyExistsException {

        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            throw new ProjectAlreadyExistsException(PROJECT_ALREADY_EXISTS);

        ProjectDao projectDao = new ProjectDao();

        projectDao.setName(project.getName());
        projectDao.setKeyword(project.getKeyword());
        projectDao.setManager(project.getManager());

        return projectsRepository.save(projectDao);
    }

    @Log
    public ProjectDao updateProject(ProjectDto project) throws ProjectNotFoundException {

        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent()) {

            ProjectDao projectDao = byName.get();

            projectDao.setManager(project.getManager());
            projectDao.setKeyword(project.getKeyword());
            projectDao.setName(project.getName());

            return projectsRepository.save(projectDao);

        } else
            throw new ProjectNotFoundException(PROJECT_NOT_EXISTS);
    }

    @Log
    public void deleteProject(ProjectDto project) throws ProjectNotFoundException {

        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent()) {

            ProjectDao projectDao = byName.get();

            projectsRepository.delete(projectDao);

        } else
            throw new ProjectNotFoundException(PROJECT_NOT_EXISTS);
    }

    @Log
    public ProjectDao getProjectByName(String projectName) throws ProjectNotFoundException {

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            return byName.get();
        else
            throw new ProjectNotFoundException();
    }
}
