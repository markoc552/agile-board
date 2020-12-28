package com.administrator.controllers;


import com.administrator.exceptions.*;
import com.administrator.model.dao.*;
import com.administrator.model.dto.*;
import com.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static com.administrator.util.AgileAdminConstants.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1/projects")
public class ProjectsController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createProject")
    public ResponseEntity<Object> createProject(@RequestBody ProjectDto project) throws RequestException, ProjectAlreadyExistsException {

        if (project == null)
            throw new RequestException(PROJECT_CAN_T_BE_NULL);

        ProjectDao result = projectService.createProject(project);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateProject")
    public ResponseEntity<Object> updateProject(@RequestBody ProjectDto project) throws RequestException, ProjectNotFoundException {

        if (project == null)
            throw new RequestException(PROJECT_CAN_T_BE_NULL);

        ProjectDao result = projectService.updateProject(project);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteProject")
    public ResponseEntity<Object> deleteProject(@RequestBody ProjectDto project) throws RequestException, ProjectNotFoundException {

        if (project == null)
            throw new RequestException(PROJECT_CAN_T_BE_NULL);

        projectService.deleteProject(project);

        return ResponseEntity.ok("Project successfully deleted");
    }

    @GetMapping("/getProject")
    public ResponseEntity<Object> getProject(@RequestParam(name = "projectName") String projectName) throws RequestException, ProjectNotFoundException {

        if (projectName == null)
            throw new RequestException(PROJECT_NAME_CAN_T_BE_NULL);

        ProjectDao project = projectService.getProjectByName(projectName);

        return ResponseEntity.ok(project);
    }
}
