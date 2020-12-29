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
@RequestMapping("/v1/component")
public class ComponentController {

    @Autowired
    ComponentService componentService;


    @PostMapping("/createComponent")
    public ResponseEntity<Object> createComponent(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody ComponentDto component) throws ComponentAlreadyExistsException {

        ComponentDao result = componentService.createComponent(component);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateComponent")
    public ResponseEntity<Object> updateComponent(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody ComponentDto component) throws ComponentNotFoundException {

        ComponentDao result = componentService.updateComponent(component);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteComponent")
    public ResponseEntity<Object> deleteComponent(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody ComponentDto component) throws ComponentNotFoundException {

        componentService.deleteComponent(component);

        return ResponseEntity.ok("Component successfully deleted");
    }

    @GetMapping("/getComponents")
    public ResponseEntity<Object> getComponentsByProjectName(@RequestParam(name = "projectName") String projectName) throws ComponentNotFoundException {

        List<ComponentDao> components = componentService.getComponentsByProject(projectName);

        return ResponseEntity.ok(components);
    }
}
