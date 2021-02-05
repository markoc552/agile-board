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

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/sprints")
public class SprintController {

    @Autowired
    SprintService sprintService;

    @PostMapping("/createSprint")
    public ResponseEntity<Object> createSprint(@Valid @NotNull(message = "Sprint can't be null") @RequestBody SprintDto sprint, @RequestParam(name = "person") String person) throws SprintAlreadyExistsException {

        SprintDao result = sprintService.createSprint(sprint, person);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateSprint")
    public ResponseEntity<Object> updateSprint(@Valid @NotNull(message = "Sprint can't be null") @RequestBody SprintDto sprint, @RequestParam(name = "person") String person) throws SprintNotFoundException {

        SprintDao result = sprintService.updateSprint(sprint, person);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteSprint")
    public ResponseEntity<Object> deleteSprint(@Valid @NotNull(message = "Sprint can't be null") @RequestBody SprintDto sprint, @RequestParam(name = "person") String person) throws SprintNotFoundException {

        sprintService.deleteSprint(sprint, person);

        return ResponseEntity.ok("Sprint successfully deleted");
    }

    @GetMapping("/getSprint")
    public ResponseEntity<Object> getSprint(@Valid @NotNull @RequestParam(name = "projectName") String projectName) throws SprintNotFoundException {

        SprintDao sprint = sprintService.getSprint(projectName);

        return ResponseEntity.ok(sprint);
    }

    @PostMapping("/addTaskToSprint")
    public ResponseEntity<Object> addTaskToSprint(@RequestParam(name = "sprintName") String sprintName, @RequestBody TaskDto task, @RequestParam(name = "person") String person) throws TaskNotFoundException {

        TaskDao taskDao = sprintService.addTaskToSprint(sprintName, task, person);

        return ResponseEntity.ok(taskDao);
    }
}
