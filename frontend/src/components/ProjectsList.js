import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function ProjectsList() {
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const token = useSelector((state) => state.token);
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

  async function handleDeleteProject(projectId) {
    const request = createRequest("DELETE", token);
    const response = await fetch(`${URL}/api/projects/${projectId}`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      dispatch({
        type: "project/deleted",
        payload: { projectId: projectId },
        token: token,
      });
    } else {
      console.log(response.status);
    }
  }

  async function handleLoadProject(projectId) {
    const request = createRequest("GET", token);
    const response = await fetch(`${URL}/api/projects/${projectId}`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "project/loaded",
        payload: result.project,
        token: token,
      });
      navigate(`../project/${projectId}`);
    }
  }

  const listProjects = projects
    ? projects.map((project) => {
        return (
          //TODO: Change to project.id
          <li key={project.projectId}>
            {project.title}
            <button onClick={() => handleLoadProject(project.projectId)}>
              Edit
            </button>
            <button onClick={() => handleDeleteProject(project.projectId)}>
              Delete
            </button>
          </li>
        );
      })
    : null;

  return (
    <div id="projects-menu">
      {projects && <ul id="projects-list">{listProjects}</ul>}
      <form id="new-project-creator" onSubmit={handleCreateProject}>
        <h3>Create a new project</h3>
        <h3>Titled:</h3>
        <input id="new-project-title" />
        <button id="submit">Create Project</button>
      </form>
    </div>
  );
}
