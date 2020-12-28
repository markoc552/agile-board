package com.administrator.controllers;


import com.administrator.exceptions.*;
import com.administrator.model.dao.*;
import com.administrator.model.dto.*;
import com.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.util.*;

import static com.administrator.util.AgileAdminConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/projects")
public class ProjectsController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createProject")
    public ResponseEntity<Object> createProject(@Valid @NotNull(message = PROJECT_CAN_T_BE_NULL) @RequestBody ProjectDto project) throws ProjectAlreadyExistsException {

        ProjectDao result = projectService.createProject(project);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateProject")
    public ResponseEntity<Object> updateProject(@Valid @NotNull(message = PROJECT_CAN_T_BE_NULL) @RequestBody ProjectDto project) throws ProjectNotFoundException {

        ProjectDao result = projectService.updateProject(project);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteProject")
    public ResponseEntity<Object> deleteProject(@Valid @NotNull(message = PROJECT_CAN_T_BE_NULL) @RequestBody ProjectDto project) throws ProjectNotFoundException {

        projectService.deleteProject(project);

        return ResponseEntity.ok("Project successfully deleted");
    }

    @GetMapping("/getProject")
    public ResponseEntity<Object> getProject(@NotNull(message = PROJECT_NAME_CAN_T_BE_NULL) @RequestParam(name = "projectName") String projectName) throws ProjectNotFoundException {

        ProjectDao project = projectService.getProjectByName(projectName);

        return ResponseEntity.ok(project);
    }

    @GetMapping("/getProjects")
    public ResponseEntity<Object> getProjectsByManager(@NotNull(message = PROJECT_NAME_CAN_T_BE_NULL) @RequestParam(name = "manager") String manager) throws ProjectNotFoundException {

        List<ProjectDao> projects = projectService.getProjectsByManager(manager);

        return ResponseEntity.ok(projects);
    }
}
