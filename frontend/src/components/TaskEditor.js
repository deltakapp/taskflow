/* This edits a task's title and details fields. */
/* It also serves as a new task creator, and alternate
/* attributes for such are marked thusly. */
/* It is an uncontrolled component: */
/* https://reactjs.org/docs/uncontrolled-components.html */

import { useLayoutEffect, useRef } from "react";
import useRequestTools from "../hooks/useRequestTools";

export default function TaskEditor({
  taskId,
  title,
  details,
  stageId,
  toggleTaskEditor,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();

  const titleField = useRef(null);
  const detailsField = useRef(null);

  /* focus on form when element opens */
  useLayoutEffect(() => {
    titleField.current.focus();
  });

  async function handleEditTask(e) {
    e.preventDefault();

    /* Get new task attributes */
    const newTitle = titleField.current.value;
    const newDetails = detailsField.current.value;

    /* Determine parameters depending on new/existing task */
    let requestType, URL, dispatchType;
    if (!taskId) {
      // parameters for new task
      requestType = "POST";
      URL = `${PATH}/stages/${stageId}/tasks`;
      dispatchType = "task/created";
      toggleTaskEditor(false); // Close task editor before request to prevent user repeating action
    } /* parameters for existing task */ else {
      requestType = "PATCH";
      URL = `${PATH}/stages/${stageId}/tasks/${taskId}`;
      dispatchType = "task/updated";
    }
    const request = createRequest(requestType, token, {
      title: newTitle,
      details: newDetails,
    });

    /* Send request */
    const response = await fetch(URL, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: dispatchType,
        payload: { task: result, stageId: stageId },
        token: token,
      });
      toggleTaskEditor(false); // close task creator
    } else handleApiError(response);
  }

  return (
    <form className="task-editor" onSubmit={handleEditTask}>
      <div className="task-editor-header">
        <input
          className="task-editor-title"
          type="text"
          maxLength={30}
          required
          defaultValue={title}
          placeholder={"New Task Title"} // placeholder for New Task
          ref={titleField}
        />
      </div>
      <textarea
        className="task-editor-details"
        type="text"
        maxLength={300}
        rows={4}
        defaultValue={details}
        placeholder={"Details (optional)"}
        ref={detailsField}
      />
      <div className="options-row">
        <button type="submit" className="btn-confirm">
          Save
        </button>
        <button
          className="btn-cancel"
          onClick={(e) => {
            e.preventDefault();
            toggleTaskEditor(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
