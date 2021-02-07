package agile.central.controllers;


import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.util.*;

import static agile.central.util.CentralConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;


    @PostMapping("/createTask")
    public ResponseEntity<Object> createTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task, @RequestParam(name = "person") String person) throws TaskAlreadyExistsException {

        TaskDao result = taskService.createTask(task, person);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateTask")
    public ResponseEntity<Object> updateTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task, @RequestParam(name = "person") String person) throws TaskNotFoundException {

        TaskDao result = taskService.updateTask(task, person);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteTask")
    public ResponseEntity<Object> deleteTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task, @RequestParam(name = "person") String person) throws TaskNotFoundException {

        taskService.deleteTask(task, person);

        return ResponseEntity.ok("Task successfully deleted");
    }

    @PostMapping("/updateTaskStatus")
    public ResponseEntity<Object> updateTaskStatus(@RequestParam(name = "ticket") String ticket,
                                                   @RequestParam(name = "status") String status,
                                                   @RequestParam(name = "person") String person) throws TaskNotFoundException {

        TaskDao taskDao = taskService.updateTaskStatus(ticket, status, person);

        return ResponseEntity.ok(taskDao);
    }

    @GetMapping("/getTaskByProject")
    public ResponseEntity<Object> getTaskByProjectName(@NotNull(message = TASK_NUMBER_CAN_T_BE_NULL) @RequestParam(name = "projectName") String projectName) throws TaskNotFoundException {

        List<TaskDao> tasksByProject = taskService.getTasksByProject(projectName);

        return ResponseEntity.ok(tasksByProject);
    }

    @GetMapping("/getTask")
    public ResponseEntity<Object> getTask(@NotNull(message = TASK_NUMBER_CAN_T_BE_NULL) @RequestParam(name = "taskNumber") String taskNumber) throws TaskNotFoundException {

        TaskDao task = taskService.getTaskByTicket(taskNumber);

        return ResponseEntity.ok(task);
    }

    @GetMapping("/getTasks")
    public ResponseEntity<Object> getTasksByAssignee(@NotNull(message = ASSIGNEE_CAN_T_BE_NULL) @RequestParam(name = "assignee") String assignee) throws TaskNotFoundException {

        List<TaskDao> tasks = taskService.getTasksByAssignee(assignee);

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/getActivity")
    public ResponseEntity<Object> getActivityByProjectName(@NotNull(message = ASSIGNEE_CAN_T_BE_NULL) @RequestParam(name = "projectName") String projectName) {

        List<ActivityDao> activityByProjectName = taskService.getActivityByProjectName(projectName);

        return ResponseEntity.ok(activityByProjectName);
    }
}
