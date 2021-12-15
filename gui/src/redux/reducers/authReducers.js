export default (
  state = {
    logged: false
  },
  action
) => {
  if (action.type === "SAVE_TOKEN") {
    return {
      ...state,
      token: action.payload.adminToken,
      centralToken: action.payload.centralToken,
    };
  } else if (action.type === "LOGGED_IN") {
    console.log(action.payload);
    return {
      ...state,
      logged: action.payload.logged,
      user: action.payload.user,
    };
  } else {
    return state;
  }
};
