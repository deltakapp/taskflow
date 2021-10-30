import { shallowEqual, useSelector } from "react-redux";
import "../styles/App.css";
import Stages from "./Stages";
import UserPanel from "./UserPanel";

function App() {
  const project = useSelector((state) => state.project, shallowEqual);
  console.log(project);
  return (
    <div className="App">
      <UserPanel />
      <hr />
      {project.id ? <Stages /> : "No Project Selected"}
    </div>
  );
}

export default App;
