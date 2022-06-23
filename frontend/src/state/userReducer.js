/* This reducer handles redux actions affecting state.user */

const initialState = {};

export default function userReducer(prevState = initialState, action) {
  let state = { ...prevState }; //mutate new state not prevState
  const payload = action.payload;

  switch (action.type) {
    case "user/created":
      state = payload;
      state.flag = "EMAIL_CONFIRMATION"; //TODO: use me
      return state;

    case "user/loggedIn":
      state = payload;
      state.flag = "LOGGED_IN";
      return state;

    case "user/failedLogin":
      state = { flag: "FAILED_LOGIN" };
      return state;

    case "user/loggedOut":
      state = { flag: "LOGGED_OUT" };
      return state;

    case "user/deleted": // currently not in use
      state = { flag: "DELETED" };
      return state;

    case "user/reorderProjects":
      /* Currently this triggers re-render of stages & tasks */
      /* This is unnecessary and may be optimized */
      state.projects = payload;
      return state;

    case "project/created":
      /* add project data to user.projects */
      state.projects = state.projects.concat({
        title: payload.title,
        projectId: payload.projectId,
      });
      return state;

    case "project/deleted":
      /* remove deleted project from user.projects */
      state.projects = state.projects.filter(
        (project) => project.projectId !== payload.projectId
      );
      return state;

    default:
      return prevState;
  }
}
