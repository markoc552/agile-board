package agile.central.util;

import agile.central.aspects.*;
import agile.central.model.dao.*;
import agile.central.repository.*;
import org.springframework.security.web.firewall.*;

import java.sql.*;
import java.sql.Date;
import java.time.*;
import java.util.*;

public class ActivityLogger {

    private final ActivityRepository activityRepository;

    public ActivityLogger(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Log
    public void pushActivity(String person, String action, String projectName) {

        Date date = new Date(Timestamp.valueOf(LocalDateTime.now()).getTime());

        ActivityDao activityDao = new ActivityDao();

        activityDao.setPerson(person);
        activityDao.setProjectName(projectName);
        activityDao.setAction(action);
        activityDao.setTimeAt(date);

        activityRepository.save(activityDao);
    }

    @Log
    public List<ActivityDao> fetchProjectActivity(String projectName) {

        Optional<List<ActivityDao>> byProjectName = activityRepository.findByProjectName(projectName);

        if(byProjectName.isPresent())
            return byProjectName.get();
        else
            throw new RequestRejectedException("Activity not found for current project!");
    }
}
