import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function NewProjectCreator() {
  const token = useSelector((state) => state.token);
  const [isActive, toggleActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCreateProject(e) {
    e.preventDefault();
    // TODO add blank title error handling
    const request = createRequest("POST", token, {
      title: `${document.getElementById("new-project-title").value}`,
    });
    const response = await fetch(`${URL}/api/projects/`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      console.log(result);
      await dispatch({
        type: "project/created",
        payload: result.project,
        token: token,
      });
      navigate(`../project/${result.project.projectId}`);
    } else {
      console.log(response.status);
    }
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
