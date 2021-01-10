package agile.administrator.services;


import agile.administrator.aspects.*;
import agile.administrator.exceptions.*;
import agile.administrator.model.dao.*;
import agile.administrator.model.dto.*;
import agile.administrator.repository.*;
import agile.administrator.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ProjectService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private UserRepository userRepository;

    @Log
    public ProjectDao createProject(ProjectDto project) throws ProjectAlreadyExistsException {

        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent())
            throw new ProjectAlreadyExistsException(AdministratorConstants.PROJECT_ALREADY_EXISTS);

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
            throw new ProjectNotFoundException(AdministratorConstants.PROJECT_NOT_EXISTS);
    }

    public void deleteProject(ProjectDto project) throws ProjectNotFoundException {

        String projectName = project.getName();

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        if (byName.isPresent()) {

            ProjectDao projectDao = byName.get();

            projectsRepository.delete(projectDao);

        } else
            throw new ProjectNotFoundException(AdministratorConstants.PROJECT_NOT_EXISTS);
    }

    @Log
    public void assignUser(UserDto userDto, String projectName) throws ProjectNotFoundException {

        Optional<ProjectDao> byName = projectsRepository.findByName(projectName);

        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byName.isPresent()) {

            ProjectDao projectDao = byName.get();

            UserDao userDao = new UserDao();

            userDao.setUsername(userDto.getUsername());
            userDao.setFirstname(userDto.getFirstname());
            userDao.setLastname(userDto.getLastname());
            userDao.setEmail(userDto.getEmail());

            List<UserDao> participants = projectDao.getParticipants();

            participants.add(userDao);

            projectsRepository.save(projectDao);

            if (byUsername.isPresent()) {

                UserDao user = byUsername.get();

                user.getEnrolledProjects().add(projectDao);

                userRepository.save(user);
            }
        }
        else
            throw new ProjectNotFoundException();
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
    public List<ProjectDao> getProjectsByManager(String manager) throws ProjectNotFoundException {

        Optional<List<ProjectDao>> byManager = projectsRepository.findByManager(manager);

        if (byManager.isPresent())
            return byManager.get();

        else
            throw new ProjectNotFoundException();
    }
}
