import "../styles/Navbar.css";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../utils/apiDomain";

export default function NavPane(props) {
//export default function NavPane() {
  const [open, toggleOpen] = useState(false);
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  async function handleCreateProject(e) {
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
      toggleOpen(false)
    } else {
      console.log(response.status);
    }
  }

  async function handleLoadProject(id) {
    const request = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
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
    }
  }

  const listProjects = projects
    ? projects.map((id) => {
        return (
          //TODO: Change to project.id
          <li key={id}>
            <button className="btn" onClick={() => handleLoadProject(id)}>{id}</button>
          </li>
        );
      })
    : null;


  const createProject = 
	open ? (
      <div className="overlay">
      <div className="overlay-inner">
        <form id="new-project-creator" onSubmit={handleCreateProject}>
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
        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
          <path fillRule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
        </svg>
      </button>
    </li>
  );

  return (
    <nav id="navbar">
      <ul className="tabrow">
        {listProjects}
        {createProject}
      </ul>
    </nav>
  );
}

