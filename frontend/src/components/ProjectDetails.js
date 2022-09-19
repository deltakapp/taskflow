/* This displays and edits a project's details within the user page.*/
/* It is an uncontrolled component: */
/* https://reactjs.org/docs/uncontrolled-components.html */

import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function ProjectDetails({
  projectId,
  title,
  isEditing,
  selectEditor,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const titleField = useRef(null);

  /* focus on form when element opens */
  useLayoutEffect(() => {
    if (isEditing) titleField.current.focus();
  });

  /* Load project from server */
  async function handleLoadProject() {
    const request = createRequest("GET", token);
    const response = await fetch(`${PATH}/projects/${projectId}`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "project/loaded",
        payload: result.project,
        token: token,
      });
      navigate(`../../../projects/${projectId}`);
    } else handleApiError(response);
  }

  async function handleDeleteProject() {
    if (window.confirm(`Are you sure you wish to delete ${title}?`)) {
      const request = createRequest("DELETE", token);
      const response = await fetch(`${PATH}/projects/${projectId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        dispatch({
          type: "project/deleted",
          payload: { projectId: projectId },
          token: token,
        });
      } else handleApiError(response);
    } else return; // Abort if user doesn't confirm delete
  }

  /* Edit project's title */
  async function handleEditProject() {
    // Get new project title
    const newTitle = titleField.current.value;

    const request = createRequest("PATCH", token, { title: newTitle });
    const response = await fetch(`${PATH}/projects/${projectId}`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "project/updated",
        payload: result.project,
        token: token,
      });
      selectEditor(null); // deactivate editor
    } else handleApiError(response);
  }

  if (isEditing) {
    return (
      <>
        <input
          className="project-title"
          defaultValue={title}
          ref={titleField}
        />
        <button
          className="btn-delete-project"
          onClick={() => handleDeleteProject(projectId)}
        >
          Delete
        </button>
        <button
          className="btn-confirm"
          onClick={() => handleEditProject(projectId)}
        >
          Save
        </button>
        <button className="btn-cancel" onClick={() => selectEditor(null)}>
          Cancel
        </button>
      </>
    );
  } else {
    return (
      <>
        <div className="project-title">{title}</div>
        <button
          className="btn-load-project"
          onClick={() => handleLoadProject(projectId)}
        >
          Load
        </button>
        <div className="dropdown options">
          <button
            className="btn-options"
            onClick={() => selectEditor(projectId)}
          >
            Options
          </button>
        </div>
      </>
    );
  }
}
