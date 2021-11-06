import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/TaskCreator.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function TaskCreator({ projectId, stageId, stageIndex }) {
  const [open, toggleOpen] = useState(false);
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleCreateTask(e) {
    e.preventDefault();
    const titleField = e.target.querySelector(".new-task-title");
    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${titleField.value}`,
      }),
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${stageId}/tasks`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "task/created",
        payload: { task: { ...result }, stageId: stageId },
      });
      titleField.value = "";
    } else {
      console.log(response);
    }
  }

  return open ? (
    <div className="task-creator">
      <form onSubmit={handleCreateTask}>
        <input className="new-task-title" />
        <button
          className="btn-close-task-creator"
          onClick={() => toggleOpen(false)}
        >
          Cancel
        </button>
        <button className="btn-create-task" type="submit">
          Create Task
        </button>
      </form>
    </div>
  ) : (
    <div className="task-creator">
      <button
        className="btn-open-task-creator"
        onClick={() => toggleOpen(true)}
      >
        New Task
      </button>
    </div>
  );
}
