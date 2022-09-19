import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NewProjectCreator from "./NewProjectCreator";
import ProjectDetails from "./ProjectDetails";

export default function UserProjects() {
  const user = useSelector((state) => state.user);

  /* Track which project details editor is open, if any */
  const [activeEditor, selectEditor] = useState(null);

  const listProjects = user.projects
    ? user.projects.map((project) => (
        <ProjectDetails
          key={project.projectId}
          projectId={project.projectId}
          title={project.title}
          isEditing={activeEditor === project.projectId}
          selectEditor={selectEditor} // Can this automatically pass param project.projectID?
        />
      ))
    : null;

  return (
    <div id="projects-menu">
      {user.projects && <div id="projects-list">{listProjects}</div>}
      <br />
      <NewProjectCreator />
      {user.flag === "TEMP" && (
        <div className="options-block">
          <button id="signup-link">
            <NavLink to="../signup" id="signup-link">
              Sign up to save work
            </NavLink>
          </button>
        </div>
      )}
    </div>
  );
}
