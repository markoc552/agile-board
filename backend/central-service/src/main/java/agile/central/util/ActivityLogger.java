package agile.central.util;

import agile.central.aspects.*;
import agile.central.model.dao.*;
import agile.central.repository.*;

import java.sql.*;
import java.time.*;

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
}
