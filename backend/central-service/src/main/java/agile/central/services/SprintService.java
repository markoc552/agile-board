package agile.central.services;


import agile.central.aspects.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.repository.*;
import agile.central.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import javax.annotation.*;
import java.sql.Date;
import java.util.*;

@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintsRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private TaskService taskService;

    private ActivityLogger activityLogger;

    @PostConstruct
    public void initActivityLogger() {
        activityLogger = new ActivityLogger(activityRepository);
    }

    @Log
    public SprintDao createSprint(SprintDto sprintDto, String person) throws SprintAlreadyExistsException, TaskNotFoundException {
        Optional<SprintDao> byName = sprintsRepository.findByName(sprintDto.getName());

        if (byName.isPresent())
            throw new SprintAlreadyExistsException("Sprint already exists!");

        SprintDao sprintDao = persistSprint(sprintDto);

        List<TaskDao> sprintTasks = taskService.getTasksBySprint(sprintDto.getName());

        sprintDao.setTasks(sprintTasks);

        activityLogger.pushActivity(person, "started sprint " + sprintDto.getName(), sprintDto.getProjectName());

        return sprintDao;
    }

    @Log
    public SprintDao updateSprint(SprintDto sprint, String person) throws SprintNotFoundException {
        Optional<SprintDao> byName = sprintsRepository.findByName(sprint.getName());

        if (byName.isPresent()) {
            SprintDao sprintDao = byName.get();

            SprintDao newSprintDao = persistSprint(sprint, sprintDao);

            activityLogger.pushActivity(person, "updated sprint " + sprint.getName(), sprint.getProjectName());

            return newSprintDao;
        } else {
            throw new SprintNotFoundException("Sprint doesn't exists!");
        }
    }

    @Log
    public void deleteSprint(SprintDto sprint, String person) throws SprintNotFoundException {
        Optional<SprintDao> byName = sprintsRepository.findByName(sprint.getName());

        if (byName.isPresent()) {
            SprintDao sprintDao = byName.get();

            sprintsRepository.delete(sprintDao);

            activityLogger.pushActivity(person, "deleted sprint " + sprint.getName(), sprint.getProjectName());
        } else {
            throw new SprintNotFoundException("Sprint doesn't exists!");
        }
    }

    @Log
    public SprintDao getSprint(String projectName) throws SprintNotFoundException {
        Optional<SprintDao> byName = sprintsRepository.findByProjectName(projectName);

        if (byName.isPresent()) {
            SprintDao sprintDao = byName.get();

            List<TaskDao> sprintTasks = taskService.getTasksBySprint(sprintDao.getName());

            sprintDao.setTasks(sprintTasks);

            return sprintDao;
        } else {
            throw new SprintNotFoundException();
        }
    }

    @Log
    public TaskDao addTaskToSprint(String sprintName, TaskDto taskDto, String person) throws TaskNotFoundException {
        TaskDao taskDao = taskService.persistTask(taskDto, sprintName);

        activityLogger.pushActivity(person, "added task " + taskDao.getName() + " to sprint " + sprintName, taskDao.getProjectName());

        return taskDao;
    }

    private SprintDao persistSprint(SprintDto sprintDto) {
        SprintDao sprintDao = new SprintDao();

        sprintDao.setName(sprintDto.getName());
        sprintDao.setFrom(new Date(sprintDto.getFrom().getTime()));
        sprintDao.setTo(new Date(sprintDto.getTo().getTime()));
        sprintDao.setProjectName(sprintDto.getProjectName());

        persistSprintTasks(sprintDto);

        return sprintsRepository.save(sprintDao);
    }

    private SprintDao persistSprint(SprintDto sprint, SprintDao sprintDao) {
        sprintDao.setName(sprint.getName());
        sprintDao.setFrom(new Date(sprint.getFrom().getTime()));
        sprintDao.setTo(new Date(sprint.getTo().getTime()));

        List<TaskDao> tasks = new ArrayList<>();

        sprint.getTasks().forEach(taskDto -> tasks.add(taskService.getTaskDao(taskDto)));

        return sprintsRepository.save(sprintDao);
    }

    private void persistSprintTasks(SprintDto sprintDto) {
        sprintDto.getTasks().forEach(taskDto -> {
            try {
                taskService.persistTask(taskDto, sprintDto.getName());
            } catch (TaskNotFoundException e) {
                e.printStackTrace();
            }
        });
    }
}
