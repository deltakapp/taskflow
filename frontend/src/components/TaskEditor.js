import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Task.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function TaskCard({ taskId, taskIndex, stageId, stageIndex }) {
  console.log("rendering task");

  const [isEditing, toggleEditing] = useState(false);
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  async function handleDeleteTask() {
    const request = createRequest("DELETE", token);
    const response = await fetch(
      `${URL}/api/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      console.log(response);
      dispatch({
        type: "task/deleted",
        payload: { stageId: stageId, taskId: taskId },
      });
    } else {
      console.log(response.status);
    }
  }

  return (
    <div className="task-card">
      <div className="title-bar">
        <p className="task-title">{task.title}</p>
        {isEditing ? (
          <button className="btn-save-task"></button>
        ) : (
          <button
            className="btn-edit-task"
            onClick={() => toggleEditing(!isEditing)}
          >
            ✏️
          </button>
        )}
      </div>
      <p className="task-details">{task.details}</p>
      {isEditing && (
        <div className="task-options">
          <button
            className="btn-delete-task"
            onClick={() => handleDeleteTask()}
          >
            🗑️ Delete
          </button>
          <button
            className="btn-complete-task"
            onClick={() => handleDeleteTask()}
          >
            ✔️ Mark Complete
          </button>
        </div>
      )}
    </div>
  );
}
