package agile.central.services;


import agile.central.aspects.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

import static agile.central.util.CentralConstants.TASK_ALREADY_EXISTS;
import static agile.central.util.CentralConstants.TASK_DOES_NOT_EXISTS;

@Service
public class TaskService {


    @Autowired
    private TaskRepository taskRepository;

    @Log
    public TaskDao createTask(TaskDto task) throws TaskAlreadyExistsException {

        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent())
            throw new TaskAlreadyExistsException(TASK_ALREADY_EXISTS);

        TaskDao taskDao = parseTask(task);

        return taskRepository.save(taskDao);
    }

    @Log
    public TaskDao updateTask(TaskDto task) throws TaskNotFoundException {

        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent()) {

            TaskDao taskDao = byName.get();

            taskDao.setName(taskName);
            taskDao.setKeyword(task.getTicket());
            taskDao.setPriority(task.getPriority());
            taskDao.setAssignee(task.getAssignee());
            taskDao.setDescription(task.getDescription());

            return taskRepository.save(taskDao);

        } else
            throw new TaskNotFoundException(TASK_DOES_NOT_EXISTS);
    }

    @Log
    public void deleteTask(TaskDto task) throws TaskNotFoundException {

        String taskName = task.getName();

        Optional<TaskDao> byName = taskRepository.findByName(taskName);

        if (byName.isPresent()) {

            TaskDao taskDao = byName.get();

            taskRepository.delete(taskDao);

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
    public TaskDao addSubtask(String taskNumber, TaskDto task) throws TaskNotFoundException {

        Optional<TaskDao> byNumber = taskRepository.findByTicket(taskNumber);

        if (byNumber.isPresent()) {

            TaskDao mainTask = byNumber.get();

            List<TaskDao> subTasks = mainTask.getSubTasks();

            TaskDao newSubtask = parseTask(task);

            subTasks.add(newSubtask);

            return taskRepository.save(mainTask);

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

        return taskDao;
    }
}
