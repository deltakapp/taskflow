import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Task.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function TaskCard({ taskId, taskIndex, stageId, stageIndex }) {
  console.log("rendering task");

  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

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
    console.log(newDetails);
    const request = createRequest("PATCH", token, {
      title: newTitle,
      details: newDetails,
    });
    const response = await fetch(
      `${URL}/api/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({ type: "task/updated", payload: result });
      toggleEditing(false);
    } else {
      console.log(response.status);
    }
    toggleEditing(false);
  }

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
        <button className="btn-delete-task" onClick={() => handleDeleteTask()}>
          🗑️ Delete Task
        </button>
        <button
          className="btn-complete-task"
          onClick={() => handleDeleteTask()}
        >
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
