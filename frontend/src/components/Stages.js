import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";

export default function Project() {
  const projectId = useSelector((state) => state.project.id);
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

  async function handleDeleteStage(id) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${id}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { id: id } });
    } else {
      console.log(response.status);
    }
  }

  const stagesList = stages ? (
    stages.map((stage) => {
      return (
        <li key={stage.id}>
          <h3>{stage.title}</h3>
          <button onClick={() => handleDeleteStage(stage.id)}>
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
      <h2>{projectId}</h2>
      <ul>{stages && stagesList}</ul>
      <textarea id="new-stage-title"></textarea>
      <button onClick={handleCreateStage}>Create Stage</button>
    </div>
  );
}
