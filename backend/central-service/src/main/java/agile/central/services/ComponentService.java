package agile.central.services;


import agile.central.aspects.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

import static agile.central.util.CentralConstants.*;

@Service
public class ComponentService {

    @Autowired
    private ComponentRepository componentRepository;

    @Log
    public ComponentDao createComponent(ComponentDto componentDto) throws ComponentAlreadyExistsException {
        String componentName = componentDto.getName();

        Optional<ComponentDao> byName = componentRepository.findByName(componentName);

        if (byName.isPresent())
            throw new ComponentAlreadyExistsException(COMPONENT_ALREADY_EXISTS);

        ComponentDao componentDao = new ComponentDao();

        componentDao.setName(componentName);
        componentDao.setProjectName(componentDto.getProjectName());

        return componentRepository.save(componentDao);
    }

    @Log
    public List<ComponentDao> getComponentsByProject(String projectName) {
        return componentRepository.findByProjectName(projectName).get();
    }

    @Log
    public ComponentDao updateComponent(ComponentDto componentDto) throws ComponentNotFoundException {
        String componentName = componentDto.getName();

        Optional<ComponentDao> byName = componentRepository.findByName(componentName);

        if (byName.isPresent()) {
            ComponentDao componentDao = byName.get();

            componentDao.setName(componentName);
            componentDao.setProjectName(componentDto.getProjectName());

            return componentRepository.save(componentDao);
        } else {
            throw new ComponentNotFoundException(COMPONENT_DOES_NOT_EXISTS);
        }
    }

    @Log
    public void deleteComponent(ComponentDto componentDto) throws ComponentNotFoundException {
        String componentName = componentDto.getName();

        Optional<ComponentDao> byName = componentRepository.findByName(componentName);

        if (byName.isPresent()) {
            ComponentDao componentDao = byName.get();

            componentRepository.delete(componentDao);
        } else {
            throw new ComponentNotFoundException(COMPONENT_DOES_NOT_EXISTS);
        }
    }
}
