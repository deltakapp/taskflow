const initialState = {
  id: null,
  title: "",
  stages: [],
};

export default function projectReducer(prevState = initialState, action) {
  let state = { ...prevState }; //mutate new state not prevState

  switch (action.type) {
    case "project/reorderStage": {
      console.log(action.payload);
      console.log(state.stages);
      const { sourceIndex, hoverIndex } = action.payload;
      const stages = [...state.stages];
      stages.splice(hoverIndex, 0, stages.splice(sourceIndex, 1)[0]);
      console.log(stages);
      return { ...state, stages: stages };
    }
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
    case "stage/updated": {
      console.log(action.payload);
      const stageId = action.payload.stage.id;
      const index = state.stages.findIndex((stage) => stage.id === stageId);
      state.stages[index] = action.payload.stage;
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
      console.log(action.payload);
      const stageIndex = state.stages.findIndex(
        (stage) => stage.id === action.payload.stageId
      );
      state.stages[stageIndex].tasks = state.stages[stageIndex].tasks.filter(
        (task) => task.id !== action.payload.id
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
