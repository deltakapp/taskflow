import { useState } from "react";
import useRequestTools from "../hooks/useRequestTools";

export default function TaskCreator({ stageId, toggleTaskCreator }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  async function handleCreateTask(e) {
    e.preventDefault();
    const request = createRequest("POST", token, {
      title: title,
      details: details,
    });
    const response = await fetch(`${PATH}/stages/${stageId}/tasks`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "task/created",
        payload: { task: result, stageId: stageId },
        token: token,
      });
      toggleTaskCreator(false); // close task creator
      setTitle(""); // reset title field
      setDetails(""); // reset details field
    } else handleApiError(response);
  }

  return (
    <div className="task-creator">
      <form onSubmit={handleCreateTask}>
        <textarea
          className="new-task-title"
          placeholder="Enter a task"
          maxLength="31"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="new-task-details"
          placeholder="Enter details (optional)"
          maxLength="500"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <div className="two-button mt-2">
          <button className="btn-create-task mr-1" type="submit">
            Create Task
          </button>
          <button
            className="btn-close-task-creator ml-1"
            onClick={() => toggleTaskCreator(false)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
