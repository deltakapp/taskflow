/* A board representing a project filled with stages. */

import { useCallback, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import useRequestTools from "../hooks/useRequestTools";
import Stage from "./Stage";
import StageCreator from "./StageCreator";

export default function ProjectBoard({
  isStageCreatorOpen,
  toggleStageCreator,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const projectId = useSelector((state) => state.project.projectId);
  const stages = useSelector((state) => state.project.stages, shallowEqual);

  /* On project load, open stage creator if no stages exist yet */
  useEffect(() => {
    if (stages.length === 0) {
      toggleStageCreator(true);
    } else toggleStageCreator(false);
  }, [projectId, stages.length, toggleStageCreator]);

  /* Reorder stages */
  const reorderStages = useCallback(
    async (sourceIndex, hoverIndex) => {
      if (!token) return; // abort if user logged out
      const newStages = [...stages]; // copy state for mutations
      newStages.splice(hoverIndex, 0, newStages.splice(sourceIndex, 1)[0]);

      /* dispatch reorder to redux state (optimistic update for performance) */
      dispatch({ type: "project/reorderStages", payload: newStages });

      /* send API request */
      const request = createRequest("PATCH", token, {
        stages: newStages.map((stage) => stage.stageId), // send array of stageIds
      });
      const response = await fetch(`${PATH}/projects/${projectId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        if (token) dispatch({ type: "token/refresh", token: token });
      } else handleApiError(response);
    },
    [stages, token, projectId, createRequest, dispatch, handleApiError, PATH] //dependency array
  );

  const stageList = stages?.map((stage, index) => (
    <Stage
      key={stage.stageId}
      stageId={stage.stageId}
      stageIndex={index}
      projectId={projectId}
      reorderStages={reorderStages}
    />
  ));

  return (
    <main id="project-board">
      {stageList}
      {isStageCreatorOpen && (
        <StageCreator
          projectId={projectId}
          toggleStageCreator={toggleStageCreator}
        />
      )}
    </main>
  );
}
