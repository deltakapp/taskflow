import { useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { apiDomain as URL } from "../utils/apiDomain";
import ProjectTab from "./ProjectTab";

export default function NavPane(props) {
  const [open, toggleOpen] = useState(false);
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  /* On each local state.projects change, send update to server */
  useCallback(async () => {
    const request = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projects: projects }),
    };
    const response = await fetch(`${URL}/api/users/${user.id}`, request);
    if (response.ok) {
      console.log(response);
    } else console.log(projects);
  }, [projects, user]);

  const handleCreateProject = useCallback(
    async (e) => {
      e.preventDefault();
      // TODO add blank title error handling
      const request = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `${document.getElementById("new-project-title").value}`,
        }),
      };
      const response = await fetch(`${URL}/api/projects/`, request);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        dispatch({ type: "project/created", payload: result });
        toggleOpen(false);
      } else {
        console.log(response.status);
      }
    },
    [user.token, dispatch]
  );

  const loadProject = useCallback(
    async (id) => {
      const request = {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const response = await fetch(`${URL}/api/projects/${id}`, request);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        dispatch({
          type: "project/loaded",
          payload: { id: id, stages: result },
        });
        navigate(`../project/${id}`);
      } else {
        // error handling will be extremely tough here
        console.log(response.status);
      }
    },
    [user.token, dispatch, navigate]
  );

  /* reorder projects in frontend (request is triggered in useEffect) */
  const reorderProject = useCallback(
    (sourceIndex, hoverIndex) => {
      console.log(sourceIndex, hoverIndex);
      dispatch({
        type: "user/reorderProject",
        payload: {
          sourceIndex: sourceIndex,
          hoverIndex: hoverIndex,
        },
      });
    },
    [dispatch]
  );

  const renderProject = useCallback(
    (projectTitle, index) => {
      // TODO: Change to project.id
      return (
        <ProjectTab
          key={projectTitle}
          index={index}
          title={projectTitle}
          reorderProject={reorderProject}
          loadProject={loadProject}
        />
      );
    },
    [reorderProject, loadProject]
  );

  const createProject = open ? ( // TODO: break into separate components
    <div className="overlay">
      <div className="overlay-inner">
        <form id="new-project-creator" onSubmit={handleCreateProject}>
          <label htmlFor="new-project-title">New Project:</label>
          <input id="new-project-title" />
          <div className="two-button mt-2">
            <button id="submit">Create Project</button>
            <button
              className="btn-close-task-creator ml-1"
              onClick={() => toggleOpen(false)}
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
      <button onClick={() => toggleOpen(true)} title="Add new project">
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
        {projects?.map((project, index) => renderProject(project, index))}
        {createProject}
      </ul>
      <br />
    </nav>
  );
}
