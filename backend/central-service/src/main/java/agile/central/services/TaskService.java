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
import java.util.*;

import static agile.central.util.CentralConstants.TASK_ALREADY_EXISTS;
import static agile.central.util.CentralConstants.TASK_DOES_NOT_EXISTS;

@Service
public class TaskService {

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
    public TaskDao createTask(TaskDto taskDto, String person) throws TaskAlreadyExistsException {
        String taskName = taskDto.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent())
            throw new TaskAlreadyExistsException(TASK_ALREADY_EXISTS);

        return persistTask(taskDto, person, taskName);
    }

    @Log
    public TaskDao updateTask(TaskDto taskDto, String person) throws TaskNotFoundException {
        String taskName = taskDto.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent()) {
            TaskDao taskDao = byName.get();

            taskDao.setName(taskName);
            taskDao.setKeyword(taskDto.getTicket());
            taskDao.setPriority(taskDto.getPriority());
            taskDao.setAssignee(taskDto.getAssignee());
            taskDao.setDescription(taskDto.getDescription());

            TaskDao persistedTask = taskRepository.save(taskDao);

            activityLogger.pushActivity(person, "updated task " + taskName, taskDao.getProjectName());

            return persistedTask;
        } else {
            throw new TaskNotFoundException(TASK_DOES_NOT_EXISTS);
        }
    }

    @Log
    public void deleteTask(TaskDto task, String person) throws TaskNotFoundException {
        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent()) {
            TaskDao taskDao = byName.get();

            taskRepository.delete(taskDao);

            activityLogger.pushActivity(person, "deleted task " + taskName, taskDao.getProjectName());
        } else
            throw new TaskNotFoundException(TASK_DOES_NOT_EXISTS);
    }

    @Log
    public TaskDao getTaskByTicket(String ticket) throws TaskNotFoundException {
        Optional<TaskDao> byTicket = taskRepository.findByTicket(ticket);

        if (byTicket.isPresent())
            return byTicket.get();
        else
            throw new TaskNotFoundException();
    }

    @Log
    public List<ActivityDao> getActivityByProjectName(String projectName) {
        return activityLogger.fetchProjectActivity(projectName);
    }

    @Log
    public List<TaskDao> getTasksByAssignee(String assignee) {
        return taskRepository.findByAssignee(assignee).get();
    }

    @Log
    public List<TaskDao> getTasksByProject(String projectName) {
        return taskRepository.findByProjectName(projectName).get();
    }

    @Log
    public List<TaskDao> getTasksBySprint(String sprintName) {
        return taskRepository.findBySprint(sprintName).get();
    }

    @Log
    public TaskDao getTaskByName(String name) throws TaskNotFoundException {
        Optional<TaskDao> taskDao = taskRepository.findByName(name);

        if(taskDao.isPresent())
            return taskDao.get();
        else
            throw new TaskNotFoundException(TASK_DOES_NOT_EXISTS);
    }

    @Log
    public TaskDao updateTaskStatus(String ticket, String status, String person) throws TaskNotFoundException {
        TaskDao taskByTicket = getTaskByTicket(ticket);

        taskByTicket.setStatus(status);

        TaskDao saved = taskRepository.save(taskByTicket);

        activityLogger.pushActivity(person, "put task " + taskByTicket.getName() + " to " + status, taskByTicket.getProjectName());

        return saved;
    }

    @Log
    public TaskDao persistTask(TaskDto taskDto, String sprintName) throws TaskNotFoundException {
        TaskDao taskDao = getTaskByName(taskDto.getName());

        taskDao.setStatus("TODO");
        taskDao.setSprint(sprintName);

        return taskRepository.save(taskDao);
    }

    @Log
    public TaskDao getTaskDao(TaskDto taskDto) {
        TaskDao taskDao = new TaskDao();

        taskDao.setName(taskDto.getName());
        taskDao.setKeyword(taskDto.getTicket());
        taskDao.setPriority(taskDto.getPriority());
        taskDao.setAssignee(taskDto.getAssignee());
        taskDao.setDescription(taskDto.getDescription());
        taskDao.setReporter(taskDto.getReporter());
        taskDao.setEstimated(taskDto.getEstimated());
        taskDao.setTicket(taskDto.getTicket());
        taskDao.setProjectName(taskDto.getProjectName());
        taskDao.setCreatedAt(taskDto.getCreatedAt());
        taskDao.setDndId(taskDto.getDndId());

        return taskDao;
    }

    private TaskDao persistTask(TaskDto taskDto, String person, String taskName) {
        TaskDao taskDao = getTaskDao(taskDto);

        TaskDao persistedTask = taskRepository.save(taskDao);

        activityLogger.pushActivity(person, "created task " + taskName, taskDao.getProjectName());

        return persistedTask;
    }
}
