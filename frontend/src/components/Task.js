import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Task.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function Task({ taskIndex, stageIndex, stageId, projectId }) {
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleDeleteTask() {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${stageId}/tasks/${task.id}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { id: task.id } });
    } else {
      console.log(response.status);
    }
  }

  return (
    <div className="task">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button className="btn-task-settings">⚙️</button>
        <button className="btn-task-delete" onClick={() => handleDeleteTask()}>
          ❌
        </button>
      </div>
    </div>
  );
}
