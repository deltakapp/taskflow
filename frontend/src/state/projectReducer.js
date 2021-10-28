const initialState = {
  id: 0,
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
      state = action.payload;
      return state;
    }
    case "project/unloaded": {
      return initialState;
    }
    case "project/deleted": {
      console.log(action.payload);
      if (action.payload === state.projectId) {
        return initialState;
      }
      return state;
    }
    case "stage/added": {
      console.log(action.payload);
      state.stages = state.stages.concat(action.payload);
      return state;
    }
    case "stage/deleted": {
      state.stages = state.stages.filter(
        (stage) => stage._id !== action.payload
      );
      return state;
    }
    default:
      return prevState;
  }
}
