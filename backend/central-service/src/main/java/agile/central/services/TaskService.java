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
import java.sql.*;
import java.sql.Date;
import java.time.*;
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
    public TaskDao createTask(TaskDto task, String person) throws TaskAlreadyExistsException {

        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent())
            throw new TaskAlreadyExistsException(TASK_ALREADY_EXISTS);

        TaskDao taskDao = parseTask(task);

        TaskDao saved = taskRepository.save(taskDao);

        activityLogger.pushActivity(person, "created task " + taskName, taskDao.getProjectName());

        return saved;
    }

    @Log
    public TaskDao updateTask(TaskDto task, String person) throws TaskNotFoundException {

        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent()) {

            TaskDao taskDao = byName.get();

            taskDao.setName(taskName);
            taskDao.setKeyword(task.getTicket());
            taskDao.setPriority(task.getPriority());
            taskDao.setAssignee(task.getAssignee());
            taskDao.setDescription(task.getDescription());

            TaskDao saved = taskRepository.save(taskDao);

            activityLogger.pushActivity(person, "updated task " + taskName, taskDao.getProjectName());

            return saved;

        } else
            throw new TaskNotFoundException(TASK_DOES_NOT_EXISTS);
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
    public List<TaskDao> getTasksByAssignee(String assignee) throws TaskNotFoundException {

        Optional<List<TaskDao>> byAssignee = taskRepository.findByAssignee(assignee);

        if (byAssignee.isPresent())
            return byAssignee.get();

        else
            throw new TaskNotFoundException();
    }

    @Log
    public List<TaskDao> getTasksByProject(String projectName) throws TaskNotFoundException {

        Optional<List<TaskDao>> byProjectName = taskRepository.findByProjectName(projectName);

        if (byProjectName.isPresent())
            return byProjectName.get();

        else
            throw new TaskNotFoundException();
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
