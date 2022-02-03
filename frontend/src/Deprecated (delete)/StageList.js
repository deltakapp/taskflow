import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";
import TaskCreator from "./TaskCreator";
import TaskList from "./TaskList";

export default function StagesList() {
  const projectId = useSelector((state) => state.project.id);
  const stages = useSelector((state) => state.project.stages, shallowEqual); //revise comparison fn
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

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
    stages.map((stage, index) => {
      return (
        <section className="stage" key={stage.id}>
          <div className="stage-header">
            <button className="btn-stage-settings">⚙️</button>
            <h3 className="stage-title">{stage.title}</h3>
            <button
              className="btn-stage-delete"
              onClick={() => handleDeleteStage(stage.id)}
            >
              X
            </button>
          </div>
          <hr />
          {!!stage.tasks.length && (
            <TaskList stageId={stage.id} stageIndex={index} />
          )}
          <TaskCreator
            projectId={projectId}
            stageId={stage.id}
            stageIndex={index}
          />
        </section>
      );
    })
  ) : (
    <li>No stages yet</li>
  );

  return <div id="stages-panel">{stages && stagesList}</div>;
}
