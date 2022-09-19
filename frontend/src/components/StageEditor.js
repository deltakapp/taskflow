/* This edits a stage's title. */
/* It is an uncontrolled component: */
/* https://reactjs.org/docs/uncontrolled-components.html */

import { useLayoutEffect, useRef } from "react";
import useRequestTools from "../hooks/useRequestTools";

export default function StageEditor({ stageId, title, toggleStageEditor }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const titleField = useRef(null);

  /* focus on form when element opens */
  useLayoutEffect(() => {
    titleField.current.focus();
  });

  /* Edit stage's title */
  async function handleEditStageName(e) {
    e.preventDefault();

    /* Get new stage title */
    const newTitle = titleField.current.value;

    const request = createRequest("PATCH", token, {
      title: newTitle,
    });
    /* Send request */
    const response = await fetch(`${PATH}/stages/${stageId}`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({ type: "stage/updated", payload: result, token: token });
      toggleStageEditor(false);
    } else handleApiError(response);
  }

  return (
    <form className="stage-name-editor" onSubmit={handleEditStageName}>
      <input
        className="rename"
        type="text"
        maxLength={30}
        defaultValue={title}
        ref={titleField}
      />
      <div className="options-row">
        <button type="submit" className="btn-confirm">
          Save
        </button>
        <button className="btn-cancel" onClick={() => toggleStageEditor(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
