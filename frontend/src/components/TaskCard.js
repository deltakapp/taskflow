import { useState } from "react";
import { useSelector } from "react-redux";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/Task.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function TaskCard({ taskId, taskIndex, stageId, stageIndex }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );

  const [isEditing, toggleEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDetails, setNewDetails] = useState(task.details);

  /* cancel edits to task and stop editing */
  function cancelEditTask() {
    setNewTitle(task.title); // reset title according to redux state
    setNewDetails(task.details);
    toggleEditing(false);
  }

  async function editTask() {
    const request = createRequest("PATCH", token, {
      title: newTitle,
      details: newDetails,
    });
    const response = await fetch(
      `${PATH}/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "task/updated",
        payload: { stageId: stageId, task: result },
        token: token,
      });
      toggleEditing(false);
    } else handleApiError(response);
    toggleEditing(false);
  }

  async function deleteTask() {
    const request = createRequest("DELETE", token);
    const response = await fetch(
      `${URL}/api/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      dispatch({
        type: "task/deleted",
        payload: { stageId: stageId, taskId: taskId },
        token: token,
      });
    } else handleApiError(response);
  }

  const titleBar = isEditing ? ( // if isEditing true
    <div className="task-title-bar">
      <input
        type="text"
        className="task-title-editor"
        placeholder={task.title}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <div>
        <button className="btn-cancel-edit-task" onClick={cancelEditTask}>
          🚫
        </button>
        <button className="btn-save-task" onClick={editTask}>
          💾
        </button>
      </div>
    </div>
  ) : (
    // if isEditing is false
    <div className="task-title-bar">
      <p className="task-title">{task.title}</p>
      <button className="btn-edit-task" onClick={() => toggleEditing(true)}>
        ✏️
      </button>
    </div>
  );

  const details = isEditing ? (
    <textarea
      className="task-details"
      name="task-details"
      rows="4"
      value={newDetails}
      onChange={(e) => setNewDetails(e.target.value)}
    ></textarea>
  ) : (
    <form>
      {task.details && <hr />}
      <p className="task-details">{task.details}</p>
    </form>
  );

  const taskOptions = isEditing && (
    <>
      <hr />
      <div className="task-options">
        <button className="btn-delete-task" onClick={() => deleteTask()}>
          🗑️ Delete Task
        </button>
        <button className="btn-complete-task" onClick={() => deleteTask()}>
          ✔️ Mark Complete
        </button>
      </div>
    </>
  );

  return (
    <div className="task-card">
      {titleBar}
      {details}
      {taskOptions}
    </div>
  );
}
