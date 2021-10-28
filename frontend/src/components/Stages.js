import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";

export default function Project() {
  const projectTitle = useSelector((state) => state.project.projectId);
  const stages = useSelector((state) => state.project.stages); //revise comparison fn
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  console.log(stages);

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
      `${URL}/api/projects/${projectTitle}/stages`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result); //TODO: convert projectId > project.id in server response
      dispatch({ type: "stage/added", payload: result });
    } else {
      console.log(response.status);
    }
  }

  async function handleDeleteStage(stageId) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      `${URL}/api/projects/${projectTitle}/stages/${stageId}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: stageId });
    } else {
      console.log(response.status);
    }
  }

  const stagesList = stages ? (
    stages.map((stage) => {
      return (
        <li key={stage._id}>
          <h3>{stage.title}</h3>
          <button onClick={() => handleDeleteStage(stage._id)}>
            Delete Stage
          </button>
          <hr />
        </li>
      );
    })
  ) : (
    <li>No stages yet</li>
  );

  return (
    <div>
      <h2>{projectTitle}</h2>
      <ul>{stages && stagesList}</ul>
      <textarea id="new-stage-title"></textarea>
      <button onClick={handleCreateStage}>Create Stage</button>
    </div>
  );
}
