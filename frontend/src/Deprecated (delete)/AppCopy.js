import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import "../styles/AppCopy.css";
import { apiDomain as URL } from "../utils/apiDomain";
import UserPanel from "./UserMenuCopy";

export default function AppCopy() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);
  const projectId = useSelector((state) => state.project.id);

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
    <div className="app-copy">
      <Header />

      <UserPanel />
      <Main />
      <textarea id="new-stage-title"></textarea>
      <button onClick={handleCreateStage}>Create Stage</button>
      <Navbar />
    </div>
  );
}
