import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function NewProjectCreator() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const [isActive, toggleActive] = useState(false); // if creator is open

  async function handleCreateProject(e) {
    e.preventDefault();

    const request = createRequest("POST", token, {
      title: `${document.getElementById("new-project-title").value}`,
    });
    const response = await fetch(`${PATH}/projects/`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "project/created",
        payload: result.project,
        token: token,
      });

      navigate(`../project/${result.project.projectId}`);
    } else handleApiError(response);
  }

  if (isActive) {
    return (
      <>
        <h3>Start a new project:</h3>
        <form
          id="new-project-creator"
          className="form-row"
          onSubmit={handleCreateProject}
        >
          <input
            id="new-project-title"
            className="form-input"
            placeholder="Project Title"
          />
          <div className="options-row">
            <button className="btn-confirm">Create Project</button>
            <button
              className="btn-cancel"
              type="button"
              onClick={() => toggleActive(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <div className="options-block">
        <button
          id="btn-enable-project-creator"
          className="btn-confirm"
          onClick={() => toggleActive(true)}
        >
          Start New Project
        </button>
      </div>
    );
  }
}
