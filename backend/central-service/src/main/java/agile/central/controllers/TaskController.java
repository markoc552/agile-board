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
    public ResponseEntity<Object> createTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task) throws TaskAlreadyExistsException {

        TaskDao result = taskService.createTask(task);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateTask")
    public ResponseEntity<Object> updateTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task) throws TaskNotFoundException {

        TaskDao result = taskService.updateTask(task);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteTask")
    public ResponseEntity<Object> deleteTask(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody TaskDto task) throws TaskNotFoundException {

        taskService.deleteTask(task);

        return ResponseEntity.ok("Task successfully deleted");
    }

    @GetMapping("/getTask")
    public ResponseEntity<Object> getTask(@NotNull(message = TASK_NUMBER_CAN_T_BE_NULL) @RequestParam(name = "taskNumber") String taskNumber) throws TaskNotFoundException {

        TaskDao task = taskService.getTaskByNumber(taskNumber);

        return ResponseEntity.ok(task);
    }

    @GetMapping("/getTasks")
    public ResponseEntity<Object> getTasksByAssignee(@NotNull(message = ASSIGNEE_CAN_T_BE_NULL) @RequestParam(name = "assignee") String assignee) throws TaskNotFoundException {

        List<TaskDao> tasks = taskService.getTasksByAssignee(assignee);

        return ResponseEntity.ok(tasks);
    }
}
