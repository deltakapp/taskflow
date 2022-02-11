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
    <div class="task">
      <p class="float-left">{task.title}</p>
      <button class="btn-task-settings float-right">⚙️</button>
      <button
        class="btn-task-delete float-right"
        onClick={() => handleDeleteTask()}
      >
        ❌
      </button>
    </div>
  );
}
