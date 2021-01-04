export default (state = { logged: true }, action) => {
  if (action.type === "SAVE_TOKEN") {
    return {
      ...state,
      token: action.payload,
    };
  } else if (action.type === "LOGGED_IN") {
    console.log(action.payload)
    return {
      ...state,
      logged: action.payload.logged,
      user: action.payload.user
    };
  } else {
    return state;
  }
};
