/* This reducer handles redux actions affecting state.user */

const initialState = {};

export default function userReducer(prevState = initialState, action) {
  let state = { ...prevState }; // mutate new copy of state not prevState
  const payload = action.payload;

  switch (action.type) {
    case "user/created":
      state = payload;
      return state;

    case "user/loggedIn":
      state = payload;
      state.flag = "LOGGED_IN";
      return state;

    case "user/loggedOut":
      state = { flag: "LOGGED_OUT" };
      return state;

    case "user/deleted":
      state = { flag: "DELETED" };
      return state;

    case "user/patched":
      if (payload.name) {
        state.name = payload.name;
      }
      if (payload.email) {
        state.email = payload.email;
      }
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

    /* Updates to project metadata, such as title, are handled by */
    /* both userReducer and projectReducer */
    case "project/updated":
      // Find matching project in user.projects
      const index = state.projects.findIndex(
        (project) => project.projectId === payload.projectId
      );
      /* Replace project title with payload title*/
      state.projects[index].title = payload.title;
      return state;

    case "project/deleted":
      // remove deleted project from user.projects
      state.projects = state.projects.filter(
        (project) => project.projectId !== payload.projectId
      );
      return state;

    default:
      /* Return prevState so as not to trigger component updates */
      return prevState;
  }
}
