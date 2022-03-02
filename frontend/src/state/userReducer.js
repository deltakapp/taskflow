const initialState = {};

export default function userReducer(prevState = initialState, action) {
  let state = { ...prevState }; //mutate new state not prevState

  switch (action.type) {
    case "user/reorderProject":
      /* Currently this triggers re-render of stages & tasks */
      /* This is unnecessary and may be optimized */
      const { sourceIndex, hoverIndex } = action.payload;
      const projects = [...state.projects];
      projects.splice(hoverIndex, 0, projects.splice(sourceIndex, 1)[0]);
      return { ...state, projects: projects };

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

    case "user/deleted": // currently not in use
      state = { flag: "DELETED" };
      return state;

    case "project/created":
      state.projects = state.projects.concat(action.payload.id);
      return state;

    case "project/deleted":
      state.projects = state.projects.filter(
        (project) => project !== action.payload.id
      );
      return state;

    default:
      return prevState;
  }
}
