import { useCallback, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/Navbar.css";
import ProjectTab from "./ProjectTab";

export default function NavPane() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const [creatorIsOpen, toggleCreatorOpen] = useState(false);

  const handleCreateProject = useCallback(
    async (e) => {
      e.preventDefault();
      // TODO add blank title error handling
      const request = createRequest("POST", token, {
        title: `${document.getElementById("new-project-title").value}`,
      });
      const response = await fetch(`${PATH}/projects/`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        const result = await response.json();
        console.log(response); // DELETE ME
        dispatch({
          type: "project/created",
          payload: result.project,
          token: token,
        });
        toggleCreatorOpen(false);
      } else handleApiError(response);
    },
    [token, createRequest, dispatch, handleApiError, PATH]
  );

  const loadProject = useCallback(
    async (projectId) => {
      const request = createRequest("GET", token);
      const response = await fetch(`${PATH}/projects/${projectId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        const result = await response.json();
        console.log(response); // DELETE ME
        dispatch({
          type: "project/loaded",
          payload: result.project,
          token: token,
        });
        navigate(`../project/${projectId}`);
      } else handleApiError(response);
    },
    [token, createRequest, dispatch, handleApiError, PATH, navigate]
  );

  /* reorder projects */
  const reorderProjects = useCallback(
    async (sourceIndex, hoverIndex) => {
      if (!token) return; // abort if user logged out
      const newProjects = [...projects]; // copy state for mutations
      newProjects.splice(hoverIndex, 0, newProjects.splice(sourceIndex, 1)[0]);

      /* dispatch reorder to redux state */
      dispatch({ type: "user/reorderProjects", payload: newProjects });

      /* send API request */
      const request = createRequest("PATCH", token, {
        projects: newProjects.map((project) => project.projectId),
      });
      const response = await fetch(`${PATH}/users/`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        if (token) dispatch({ type: "token/refresh", token: token });
      } else handleApiError(response);
    },
    [projects, token, createRequest, dispatch, handleApiError, PATH]
  );

  const renderProjectTab = useCallback(
    (index, title, projectId) => {
      return (
        <ProjectTab
          key={projectId}
          index={index}
          title={title}
          projectId={projectId}
          reorderProjects={reorderProjects}
          loadProject={loadProject}
        />
      );
    },
    [reorderProjects, loadProject]
  );

  const createProject = creatorIsOpen ? ( // TODO: break into separate components
    <div className="overlay">
      <div className="overlay-inner">
        <form id="new-project-creator" onSubmit={handleCreateProject}>
          <label htmlFor="new-project-title">New Project:</label>
          <input id="new-project-title" />
          <div className="two-button mt-2">
            <button id="submit">Create Project</button>
            <button
              className="btn-close-task-creator ml-1"
              onClick={() => toggleCreatorOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <li className="add-project">
      <button onClick={() => toggleCreatorOpen(true)} title="Add new project">
        <svg
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
        >
          <path
            fillRule="evenodd"
            d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"
          ></path>
        </svg>
      </button>
    </li>
  );

  return (
    <nav id="navbar">
      <ul className="tabrow">
        {projects?.map((project, index) =>
          renderProjectTab(index, project.title, project.projectId)
        )}
        {createProject}
      </ul>
      <br />
    </nav>
  );
}
