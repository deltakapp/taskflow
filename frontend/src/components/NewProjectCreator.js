import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function NewProjectCreator() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const [isActive, toggleActive] = useState(false); // if creator is active

  async function handleCreateProject(e) {
    e.preventDefault();
    // TODO add blank title error handling
    const request = createRequest("POST", token, {
      title: `${document.getElementById("new-project-title").value}`,
    });
    const response = await fetch(`${PATH}/projects/`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      await dispatch({
        type: "project/created",
        payload: result.project,
        token: token,
      });
      navigate(`../project/${result.project.projectId}`);
    } else handleApiError(response);
  }

  if (isActive) {
    return (
      <form id="new-project-creator" onSubmit={handleCreateProject}>
        <h3>Start a new project:</h3>
        <input id="new-project-title" placeholder="Project Title" />
        <button id="submit">Create Project</button>
        <button
          id="btn-toggle-project-creator"
          onClick={() => toggleActive(false)}
        >
          Cancel
        </button>
      </form>
    );
  } else {
    return (
      <button
        id="btn-toggle-project-creator"
        onClick={() => toggleActive(true)}
      >
        Start New Project
      </button>
    );
  }
}
