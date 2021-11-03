import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function Project() {
  const projectId = useSelector((state) => state.project.id);
  const stages = useSelector((state) => state.project.stages); //revise comparison fn
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  console.log(stages);

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
        <section className="stage" key={stage.id}>
          <div className="stage-header">
            <h3 className="stage-title">{stage.title}</h3>
            <div className="btn-stage-settings">⚙️</div>
          </div>
          <hr />
          <button onClick={() => handleDeleteStage(stage.id)}>
            Delete Stage
          </button>
        </section>
      );
    })
  ) : (
    <li>No stages yet</li>
  );

  return <div id="stages-panel">{stages && stagesList}</div>;
}
