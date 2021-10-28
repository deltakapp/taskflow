const initialState = {};

export default function userReducer(prevState = initialState, action) {
  let state = { ...prevState };

  switch (action.type) {
    case "user/created":
      state = action.payload;
      state.flag = "EMAIL_CONFIRMATION"; //TODO: use me
      return state;

    case "user/loggedIn":
      state = action.payload;
      state.flag = "LOGGED_IN";
      return state;

    case "user/failedLogin":
      state = { flag: "FAILED_LOGIN" };
      return state;

    case "user/loggedOut":
      state = { flag: "LOGGED_OUT" };
      return state;

    case "user/deleted":
      state = { flag: "DELETED" };
      return state;

    case "project/created":
      state.projects = state.projects.concat(action.payload.projectId);
      return state;

    case "project/deleted":
      state.projects = state.projects.filter(
        (project) => project !== action.payload
      );
      return state;

    default:
      return prevState;
  }
}
