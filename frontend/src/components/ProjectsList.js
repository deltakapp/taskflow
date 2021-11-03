/* Nomenclature: when creating a new project, the intended name */
/* of the project is called "title", until it is sent to database */
/* and created, after which the project's name is referred to as "id" */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";

export default function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.projects, shallowEqual);
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
    } else {
      console.log(response.status);
    }
  }

  async function handleDeleteProject(id) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${URL}/api/projects/${id}`, request);
    if (response.ok) {
      dispatch({ type: "project/deleted", payload: { id: id } });
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
    }
  }

  const listProjects = projects
    ? projects.map((id) => {
        return (
          //TODO: Change to project.id
          <li key={id}>
            {id}
            <button onClick={() => handleLoadProject(id)}>Edit</button>
            <button onClick={() => handleDeleteProject(id)}>Delete</button>
          </li>
        );
      })
    : null;

  return (
    <div id="projectsList">
      {projects && <ul>{listProjects}</ul>}
      <textarea id="new-project-title"></textarea>
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
}
