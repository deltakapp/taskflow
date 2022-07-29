import { shallowEqual, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/UserProjectsMenu.css";
import NewProjectCreator from "./NewProjectCreator";

export default function UserProjects() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const user = useSelector((state) => state.user);

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
      navigate(`../../../projects/${projectId}`);
    } else handleApiError(response);
  }

  const listProjects = projects
    ? projects.map((project) => {
        return (
          //TODO: Change to project.id
          <li key={project.projectId}>
            <div className="project-title">{project.title}</div>
            <button
              className="btn-edit-project"
              onClick={() => handleLoadProject(project.projectId)}
            >
              Edit
            </button>
            <button
              className="btn-delete-projct"
              onClick={() => handleDeleteProject(project.projectId)}
            >
              Delete
            </button>
          </li>
        );
      })
    : null;

  return (
    <div id="projects-menu" className="double">
      {projects && <ul id="projects-list">{listProjects}</ul>}
      <NewProjectCreator />
      {(user.flag = "TEMP") && (
        <button>
          <NavLink to="signup" id="signup-link">
            Sign up to save work
          </NavLink>
        </button>
      )}
    </div>
  );
}
