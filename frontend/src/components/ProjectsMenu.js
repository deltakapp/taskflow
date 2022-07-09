import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/ProjectsMenu.css";
import NewProjectCreator from "./NewProjectCreator";

export default function ProjectsMenu() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.user.projects, shallowEqual);

  //TODO: add a popup if flag: user created

  async function handleDeleteProject(projectId) {
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
  }

  async function handleLoadProject(projectId) {
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
      navigate(`../project/${projectId}`);
    } else handleApiError(response);
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
      <NewProjectCreator />
    </div>
  );
}
