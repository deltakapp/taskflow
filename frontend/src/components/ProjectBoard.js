import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/ProjectBoard.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";
import Stage from "./Stage";
import StageCreator from "./StageCreator";

export default function ProjectBoard() {
  const projectId = useSelector((state) => state.project.projectId);
  const stages = useSelector((state) => state.project.stages, shallowEqual);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  /* Reorder stages */
  const reorderStages = useCallback(
    async (sourceIndex, hoverIndex) => {
      if (!token) return; // abort if user logged out
      const newStages = [...stages]; // copy state for mutations
      newStages.splice(hoverIndex, 0, newStages.splice(sourceIndex, 1)[0]);
      console.log(newStages);

      /* dispatch reorder to redux state */
      dispatch({ type: "project/reorderStages", payload: newStages });

      /* send API request */
      const request = createRequest("PATCH", token, {
        stages: newStages.map((stage) => stage.stageId), // send array of stageIds
      });
      const response = await fetch(`${URL}/api/projects/${projectId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        if (token) dispatch({ type: "token/refresh", token: token });
      } else {
        console.error(response);
      }
    },
    [stages, token, projectId, dispatch]
  );

  const stageList = stages?.map((stage, index) => (
    <Stage
      key={stage.stageId}
      stageId={stage.stageId}
      stageIndex={index}
      title={stage.title}
      reorderStages={reorderStages}
    />
  ));

  return (
    <div id="project-board">
      {stageList}
      {/* {stages?.map((stage, index) =>
        renderStage(stage.stageId, index, stage.title)
      )} */}
      <StageCreator projectId={projectId} />
    </div>
  );
}
