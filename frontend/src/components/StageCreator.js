/* This creates a new stage */
/* It is an uncontrolled component: */
/* https://reactjs.org/docs/uncontrolled-components.html */

import { useLayoutEffect, useRef } from "react";
import useRequestTools from "../hooks/useRequestTools";

export default function StageCreator({ projectId, toggleStageCreator }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const stageCreatorElement = useRef(null);
  const titleField = useRef(null);

  /* After load, remove .hidden-below class of stage creator for animation */
  useLayoutEffect(() => {
    window.setTimeout(() => {
      if (!stageCreatorElement.current) return;
      stageCreatorElement.current.classList.remove("hidden-below");
    }, 1); // Timeout ensures effect fires after DOM painting
  }, [stageCreatorElement]);

  /* After load and animation, focus on titleField */
  useLayoutEffect(() => {
    window.setTimeout(() => {
      if (!titleField.current) return;
      titleField.current.focus();
    }, 450); // timeout = css transition time + 50ms
  }, [titleField]);

  async function handleCreateStage(e) {
    e.preventDefault();
    const request = createRequest("POST", token, {
      title: titleField.current.value,
      projectId: projectId,
    });
    const response = await fetch(`${PATH}/stages`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "stage/created",
        payload: result,
        token: token,
      });
      toggleStageCreator(false);
    } else handleApiError(response);
  }

  return (
    <section className="stage-creator hidden-below" ref={stageCreatorElement}>
      <form onSubmit={(e) => handleCreateStage(e)}>
        <h3>Create Stage:</h3>
        <input type="text" maxLength={26} required ref={titleField} />
        <button className="btn-confirm" type="submit">
          Save
        </button>
        <button
          className="btn-toggle-stage-creator btn-cancel"
          onClick={(e) => {
            e.preventDefault();
            toggleStageCreator(false);
          }}
        >
          Cancel
        </button>
      </form>
    </section>
  );
}
