import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  project: projectReducer,
  user: userReducer,
  token: tokenReducer,
});

export default rootReducer;
