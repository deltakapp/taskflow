import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import { apiDomain as URL } from "../utils/apiDomain";
import Header from "./Header";
import Main from "./Main";
import Navbar from "./Navbar";
import UserPanel from "./UserPanel";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);
  const projectId = useSelector((state) => state.project.id, shallowEqual);

  async function handleCreateStage(e) {
    e.preventDefault();
    const newStageTitle = document.getElementById("new-stage-title").value;
    if (newStageTitle === "") {
      window.alert("You must enter a title to create a new stage");
      return;
    }
    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stageTitle: newStageTitle,
      }),
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result); //TODO: convert projectId > projectId in server response
      dispatch({ type: "stage/created", payload: result });
    } else {
      console.log(response.status);
    }
  }

  return (
    <div className="App">
      <Header />

      <UserPanel />
      <Main />
      <textarea id="new-stage-title"></textarea>
      <button onClick={handleCreateStage}>Create Stage</button>
      <Navbar />
    </div>
  );
}

export default App;
