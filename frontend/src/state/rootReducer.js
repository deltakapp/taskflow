import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
});

export default rootReducer;
