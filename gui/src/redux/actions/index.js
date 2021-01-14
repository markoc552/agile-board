import React from "react";
import Axios from "axios";
import { Label, Icon } from "semantic-ui-react";
import { uuid } from "uuidv4";

export const saveToken = (token) => (dispatch) => {
  console.log("Saved token");

  dispatch({ type: "SAVE_TOKEN", payload: token });
};

export const login = (logged, user) => (dispatch) => {
  console.log("isLogged: ", user);

  dispatch({ type: "LOGGED_IN", payload: { logged, user } });
};

export const selectCurrentProject = (project) => (dispatch) => {
  console.log("Selected project is: ", project);

  dispatch({ type: "SELECT_PROJECT", payload: project });
};

export const loadCreatedTasks = (selectedProject) => (dispatch) => {
  const tasks = [];

  const itemsFromBackend = [];

  Axios.get(`${window.ENVIRONMENT.AGILE_CENTRAL}/v1/tasks/getTaskByProject`, {
    params: {
      projectName: selectedProject,
    },
  })
    .then((res) => {
      res.data.map((task) => {
        const id = uuid();
        tasks.push({ id: id, content: task });
        itemsFromBackend.push({
          id: id,
          content: (
            <div>
              <Label color="blue" basic style={{ marginRight: "1vw" }}>
                {task.keyword}
              </Label>
              {task.name}
              <Icon name="user" style={{ marginLeft: "1.5vw" }} />
            </div>
          ),
        });
      });
    })
    .catch((err) => console.log(err));

  dispatch({
    type: "LOAD_CREATED_TASKS",
    payload: { tasks, itemsFromBackend },
  });
};
