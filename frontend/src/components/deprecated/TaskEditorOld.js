import { useState } from "react";
import { useDispatch } from "react-redux";
import createRequest from "../../utils/createRequest";

export default function TaskEditor({
  open,
  toggleOpen,
  stageId,
  taskId,
  title,
  details,
  token,
}) {
  console.log("rendering task editor");

  const [newTitle, setNewTitle] = useState(title);
  const [newDetails, setNewDetails] = useState(details);
  // const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  function closeTaskEditor() {
    toggleOpen(false);
    setNewTitle(title);
    setNewDetails(details);
  }

  async function handleEditTask(e) {
    // TODO: validate task name
    e.preventDefault();
    const request = createRequest("PATCH", token, {
      title: newTitle,
      details: newDetails,
    });
    const response = await fetch(
      `${URL}/api/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      toggleOpen(false);
      const result = await response.json();
      console.log(result);
      dispatch({ type: "task/updated", payload: result });
      closeTaskEditor();
    } else {
      console.log(response.status);
    }
  }

  return open ? (
    <div className="overlay">
      <div className="overlay-inner">
        <form className="stage-rename" onSubmit={handleEditTask}>
          <label htmlFor="edit-task-name">Edit Task Name:</label>
          <input
            type="text"
            className="edit-task-name"
            maxLength="30"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label htmlFor="edit-task-details">Edit Details:</label>
          <input
            type="text"
            className="edit-task-details"
            maxLength="30"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
          />
          <div className="two-button mt-2">
            <button className="btn-task-edit mr-1" type="submit">
              Save
            </button>
            <button
              className="btn-close-task-editor ml-1"
              onClick={() => closeTaskEditor()}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null; // render nothing if open == false
}
