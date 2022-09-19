/* This is a component of the ProjectPage and is used to */
/* navigate between projects, and allows */
/* projects to be reordered through drag-and-drop. */
/* This component is shaped like a row of folder tabs with active tab on top */

/* Functions herein are declared as useCallback for memo-ization */
/* for performance because navbar and subcomponents will be */
/* re-rendered very frequently during drag and drop */

import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";
import ProjectTab from "./ProjectTab";

export default function NavPane() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const currentProjectId = useSelector((state) => state.project.projectId);

  /* Load a project from server */
  const loadProject = useCallback(
    async (projectId) => {
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
        navigate(`../projects/${projectId}`);
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

  /* renders one projectTab within tabrow */
  const renderProjectTab = useCallback(
    (index, title, projectId) => {
      return (
        <ProjectTab
          key={projectId}
          index={index}
          title={title}
          projectId={projectId}
          isActiveProject={projectId === currentProjectId}
          reorderProjects={reorderProjects}
          loadProject={loadProject}
        />
      );
    },
    [currentProjectId, reorderProjects, loadProject]
  );

  return (
    <nav id="navbar">
      <ul className="tab-row">
        {projects?.map((project, index) =>
          renderProjectTab(index, project.title, project.projectId)
        )}
      </ul>
    </nav>
  );
}
