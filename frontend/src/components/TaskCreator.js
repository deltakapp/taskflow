import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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

  /*  TODO: add disabled="" to Create Task button
            requires js to remove if content in text area */

  return open ? (
    <div className="task-creator">
      <form onSubmit={handleCreateTask}>
        <textarea
	  className="new-task-title"
	  placeholder="Enter a task"
	  maxlength="31">
	</textarea>
	<div className="two-button mt-2">
          <button className="btn-create-task mr-1" type="submit">
            Create Task
          </button>
          <button
            className="btn-close-task-creator ml-1"
            onClick={() => toggleOpen(false)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="task-creator float-right">
      <button
        className="btn-open-task-creator"
        onClick={() => toggleOpen(true)}
      >
        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="mr-2">
          <path fillRule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
        </svg>
      </button>
    </div>
  );
}
