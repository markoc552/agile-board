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
    private TaskRepository taskRepository;

    @Autowired
    private ActivityRepository activityRepository;

    private ActivityLogger activityLogger;

    @PostConstruct
    public void initActivityLogger() {
        activityLogger = new ActivityLogger(activityRepository);
    }

    @Log
    public SprintDao createSprint(SprintDto sprint, String person) throws SprintAlreadyExistsException {

        Optional<SprintDao> byName = sprintsRepository.findByName(sprint.getName());

        if (byName.isPresent())
            throw new SprintAlreadyExistsException("Sprint already exists!");

        SprintDao sprintDao = new SprintDao();

        sprintDao.setName(sprint.getName());
        sprintDao.setFrom(new Date(sprint.getFrom().getTime()));
        sprintDao.setTo(new Date(sprint.getTo().getTime()));
        sprintDao.setProjectName(sprint.getProjectName());

        sprint.getTasks().forEach(item -> {
            Optional<TaskDao> optionalTask = taskRepository.findByName(item.getName());

            if(optionalTask.isPresent()) {

                TaskDao taskDao = optionalTask.get();

                taskDao.setStatus("TODO");
                taskDao.setSprint(sprint.getName());
                taskRepository.save(taskDao);
            }

        });

        SprintDao save = sprintsRepository.save(sprintDao);

        Optional<List<TaskDao>> byProjectName = taskRepository.findBySprint(sprint.getName());

        byProjectName.ifPresent(save::setTasks);

        activityLogger.pushActivity(person, "started sprint " + sprint.getName(), sprint.getProjectName());

        return save;
    }

    @Log
    public SprintDao updateSprint(SprintDto sprint, String person) throws SprintNotFoundException {

        Optional<SprintDao> byName = sprintsRepository.findByName(sprint.getName());

        if (byName.isPresent()) {

            SprintDao sprintDao = byName.get();

            sprintDao.setName(sprint.getName());
            sprintDao.setFrom(new Date(sprint.getFrom().getTime()));
            sprintDao.setTo(new Date(sprint.getTo().getTime()));
            List<TaskDao> tasks = new ArrayList<>();
            sprint.getTasks().forEach(item -> tasks.add(parseTask(item)));

            SprintDao saved = sprintsRepository.save(sprintDao);

            activityLogger.pushActivity(person, "updated sprint " + sprint.getName(), sprint.getProjectName());

            return saved;

        } else
            throw new SprintNotFoundException("Sprint doesn't exists!");
    }

    @Log
    public void deleteSprint(SprintDto sprint, String person) throws SprintNotFoundException {

        Optional<SprintDao> byName = sprintsRepository.findByName(sprint.getName());

        if (byName.isPresent()) {

            SprintDao sprintDao = byName.get();

            sprintsRepository.delete(sprintDao);

            activityLogger.pushActivity(person, "deleted sprint " + sprint.getName(), sprint.getProjectName());

        } else
            throw new SprintNotFoundException("Sprint doesn't exists!");
    }

    @Log
    public SprintDao getSprint(String projectName) throws SprintNotFoundException {

        Optional<SprintDao> byName = sprintsRepository.findByProjectName(projectName);

        if(byName.isPresent()) {
            SprintDao sprintDao = byName.get();

            Optional<List<TaskDao>> byProjectName = taskRepository.findBySprint(sprintDao.getName());

            byProjectName.ifPresent(sprintDao::setTasks);

            return sprintDao;
        }
        else
            throw new SprintNotFoundException();
    }

    @Log
    public TaskDao addTaskToSprint(String sprintName, TaskDto task, String person) throws TaskNotFoundException {

        Optional<TaskDao> byName = taskRepository.findByName(task.getName());

        if(byName.isPresent()) {

            TaskDao taskDao = byName.get();

            taskDao.setSprint(sprintName);
            taskDao.setStatus("TODO");

            taskRepository.save(taskDao);

            activityLogger.pushActivity(person, "added task " + taskDao.getName() + " to sprint " + sprintName, taskDao.getProjectName());

            return taskDao;

        } else
            throw new TaskNotFoundException();
    }

    @Log
    private TaskDao parseTask(TaskDto task) {

        TaskDao taskDao = new TaskDao();

        taskDao.setName(task.getName());
        taskDao.setKeyword(task.getTicket());
        taskDao.setPriority(task.getPriority());
        taskDao.setAssignee(task.getAssignee());
        taskDao.setDescription(task.getDescription());
        taskDao.setReporter(task.getReporter());
        taskDao.setEstimated(task.getEstimated());
        taskDao.setTicket(task.getTicket());
        taskDao.setProjectName(task.getProjectName());
        taskDao.setCreatedAt(task.getCreatedAt());
        taskDao.setDndId(task.getDndId());

        return taskDao;
    }
}
