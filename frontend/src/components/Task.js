import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Task.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function Task({ taskIndex, stageIndex, stageId, projectId }) {
  console.log(stageIndex);
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleDeleteTask() {
    const request = createRequest("DELETE", user.token);
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${stageId}/tasks/${task.id}`,
      request
    );
    if (response) {
      console.log("response received");
    }
    if (response.ok) {
      console.log("dispatching delete");
      dispatch({
        type: "task/deleted",
        payload: { id: task.id, stageId: stageId },
      });
    } else {
      console.log(response.status);
    }
  }

  return (
    <div className="task">
      <p className="float-left">{task.title}</p>
      <button className="btn-task-settings float-right">⚙️</button>
      <button
        className="btn-task-delete float-right"
        onClick={() => handleDeleteTask()}
      >
        ❌
      </button>
    </div>
  );
}
