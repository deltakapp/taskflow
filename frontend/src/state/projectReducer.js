const initialState = {
  id: null,
  title: "",
  stages: [],
};

export default function projectReducer(prevState = initialState, action) {
  let state = { ...prevState };

  switch (action.type) {
    case "project/created": {
      state = action.payload;
      state.stages = [];
      return state;
    }
    case "project/loaded": {
      // not yet used
      state = action.payload;
      return state;
    }
    case "project/unloaded": {
      return initialState;
    }
    case "project/deleted": {
      console.log(action.payload.id);
      if (action.payload.id === state.id) {
        return initialState;
      }
      return state;
    }
    case "stage/created": {
      console.log(action.payload);
      state.stages = state.stages.concat(action.payload);
      return state;
    }
    case "stage/deleted": {
      state.stages = state.stages.filter(
        (stage) => stage.id !== action.payload.id
      );
      return state;
    }
    case "task/created": {
      console.log(action.payload);
      const stageId = action.payload.stageId;
      const index = state.stages.findIndex((stage) => stage.id === stageId);
      const task = action.payload.task;
      state.stages[index].tasks = state.stages[index].tasks.concat(task);
      return state;
    }
    case "task/deleted": {
      state.stages = state.stages.filter(
        (stage) => stage.id !== action.payload.id
      );
      return state;
    }
    case "user/loggedOut": {
      return initialState;
    }
    default:
      return prevState;
  }
}
