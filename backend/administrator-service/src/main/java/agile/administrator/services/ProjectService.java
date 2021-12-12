package agile.administrator.services;


import agile.administrator.aspects.*;
import agile.administrator.exceptions.*;
import agile.administrator.model.dao.*;
import agile.administrator.model.dto.*;
import agile.administrator.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;
import static agile.administrator.util.AdministratorConstants.PROJECT_ALREADY_EXISTS;
import static agile.administrator.util.AdministratorConstants.PROJECT_NOT_EXISTS;

@Service
public class ProjectService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private UserService userService;

    @Log
    public ProjectDao createProject(ProjectDto projectDto) throws ProjectAlreadyExistsException {
        String projectName = projectDto.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            throw new ProjectAlreadyExistsException(PROJECT_ALREADY_EXISTS);

        return persistProject(projectDto);
    }

    @Log
    public ProjectDao updateProject(ProjectDto projectDto) throws ProjectNotFoundException {
        String projectName = projectDto.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent()) {
            ProjectDao projectDao = byName.get();

            return persistProject(projectDto, projectDao);
        } else {
            throw new ProjectNotFoundException(PROJECT_NOT_EXISTS);
        }
    }

    public void deleteProject(ProjectDto project) throws ProjectNotFoundException {
        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            projectsRepository.delete(byName.get());
        else
            throw new ProjectNotFoundException(PROJECT_NOT_EXISTS);
    }

    @Log
    public void assignUser(UserDto userDto, String projectName) throws ProjectNotFoundException, UserNotFoundException {
        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        UserDao userToEnroll = userService.getUserByUsername(userDto.getUsername());

        if (byName.isPresent()) {
            ProjectDao projectDao = byName.get();

            UserDao userDao = userService.getUserDao(userDto);

            persistParticipants(projectDao, userDao);

            userService.enrollUserToProject(userToEnroll, projectDao);
        } else {
            throw new ProjectNotFoundException();
        }
    }

    @Log
    public ProjectDao getProjectByName(String projectName) throws ProjectNotFoundException {
        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            return byName.get();
        else
            throw new ProjectNotFoundException();
    }

    @Log
    public List<ProjectDao> getAllProjects() {
        return projectsRepository.findAll();
    }

    @Log
    public List<ProjectDao> getProjectsByManager(String manager) {
        return projectsRepository.findByManager(manager).get();
    }


    private ProjectDao persistProject(ProjectDto projectDto) {
        ProjectDao projectDao = new ProjectDao();

        projectDao.setName(projectDto.getName());
        projectDao.setKeyword(projectDto.getKeyword());
        projectDao.setManager(projectDto.getManager());

        return projectsRepository.save(projectDao);
    }

    private ProjectDao persistProject(ProjectDto project, ProjectDao projectDao) {
        projectDao.setManager(project.getManager());
        projectDao.setKeyword(project.getKeyword());
        projectDao.setName(project.getName());

        return projectsRepository.save(projectDao);
    }

    private void persistParticipants(ProjectDao projectDao, UserDao userDao) {
        List<UserDao> participants = projectDao.getParticipants();

        participants.add(userDao);

        projectsRepository.save(projectDao);
    }
}
