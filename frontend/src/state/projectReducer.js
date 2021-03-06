/* This reducer handles redux actions affecting state.project */

const initialState = {
  projectId: null,
  title: "",
  stages: [],
};

export default function projectReducer(prevState = initialState, action) {
  let state = { ...prevState }; // mutate new state not prevState
  const payload = action.payload;
  if (
    action.type.startsWith("project") ||
    action.type.startsWith("stage") ||
    action.type.startsWith("task")
  ) {
    console.log(payload);
  }

  switch (action.type) {
    /***** Project actions *****/
    case "project/reorderStages": {
      state.stages = payload;
      return state;
    }
    case "project/created": {
      if (!state.projectId) {
        state = payload;
      }
      return state;
    }
    case "project/loaded": {
      state = payload;
      return state;
    }
    case "project/unloaded": {
      return initialState;
    }
    case "project/deleted": {
      // TODO: amend to just payload not payload.project
      if (payload.projectId === state.projectId) {
        return initialState;
      }
      return state;
    }

    /***** Stage actions *****/
    case "stage/created": {
      state.stages = state.stages.concat(payload);
      return state;
    }
    case "stage/updated": {
      const index = state.stages.findIndex(
        (stage) => stage.stageId === payload.stageId
      );
      state.stages[index] = payload;
      return state;
    }
    case "stage/deleted": {
      state.stages = state.stages.filter(
        (stage) => stage.stageId !== payload.stageId
      );
      return state;
    }

    /***** Task actions *****/
    case "task/created": {
      // find stage
      const stage = state.stages.find(
        (stage) => stage.stageId === payload.stageId
      );
      // add new task
      stage.tasks = stage.tasks.concat(payload.task);
      return state;
    }
    case "task/deleted": {
      // find stage
      const stage = state.stages.find(
        (stage) => stage.stageId === payload.stageId
      );
      // delete task
      stage.tasks = stage.tasks.filter(
        (task) => task.taskId !== payload.taskId
      );
      return state;
    }
    case "task/updated": {
      // locate stage
      const stageIndex = state.stages.findIndex(
        (stage) => stage.stageId === payload.stageId
      );
      // locate task
      const taskIndex = state.stages[stageIndex].tasks.findIndex(
        (task) => task.taskId === payload.task.taskId
      );
      state.stages[stageIndex].tasks[taskIndex] = payload.task;
      return state;
    }

    /***** User actions *****/
    case "user/loggedOut": {
      return initialState;
    }

    /***** Default *****/
    default:
      return prevState;
  }
}
