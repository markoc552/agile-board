export default (state = {}, action) => {
  if (action.type === "SELECT_PROJECT") {
    return {
      ...state,
      selectedProject: action.payload,
    };
  } else if (action.type === "LOAD_CREATED_TASKS") {
    return {
      ...state,
      tasks: action.payload.tasks,
      itemsFromBackend: action.payload.itemsFromBackend,
    };
  } else {
    return state;
  }
};
