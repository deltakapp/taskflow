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
        projectName: `${document.getElementById("new-project-name").value}`,
      }),
    };
    const response = await fetch(`${URL}/api/projects/`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result); //TODO: convert projectId > project.id in server response
      dispatch({ type: "project/created", payload: result });
    } else {
      console.log(response.status);
    }
  }

  async function handleDeleteProject(projectName) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${URL}/api/projects/${projectName}`, request);
    if (response.ok) {
      dispatch({ type: "project/deleted", payload: projectName });
    } else {
      console.log(response.status);
    }
  }

  const listProjects = projects.map((project) => {
    return (
      //TODO: Change to project.id
      <li key={project}>
        {project}
        <button>Edit [XXX]</button>
        <button onClick={() => handleDeleteProject(project)}>Delete</button>
      </li>
    );
  });

  return (
    <div>
      {projects && <ul>{listProjects}</ul>}
      <textarea id="new-project-name"></textarea>
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
}
