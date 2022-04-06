import { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/ProjectBoard.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";
import Stage from "./Stage";
import StageCreator from "./StageCreator";

export default function ProjectBoard() {
  const projectId = useSelector((state) => state.project.id);
  const stages = useSelector((state) => state.project.stages, shallowEqual);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  /* reorder projects in frontend (request is triggered in useEffect) */
  const reorderStage = useCallback(
    (sourceIndex, hoverIndex) => {
      console.log(sourceIndex, hoverIndex);
      dispatch({
        type: "project/reorderStage",
        payload: {
          sourceIndex: sourceIndex,
          hoverIndex: hoverIndex,
        },
      });
    },
    [dispatch]
  );

  /* On each local state.projects change, send update to server */
  const patchStages = useCallback(
    async (stages) => {
      if (!token) return; // abort if user logged out
      const request = createRequest("PATCH", token, { stages: stages });
      console.log(request);
      const response = await fetch(`${URL}/api/projects/${projectId}`, request);
      if (response.ok) {
        console.log(response);
      } else console.log(response);
    },
    [token, projectId]
  );

  /* Trigger patchStages when stages is updated */
  useEffect(() => {
    patchStages(stages);
  }, [stages]);

  const stageList = stages
    ? stages.map((stage, index) => {
        return (
          <Stage
            key={stage.id}
            id={stage.id}
            stageIndex={index}
            title={stage.title}
            projectId={projectId}
            reorderStage={reorderStage}
          />
        );
      })
    : null;

  return (
    <div id="project-board">
      {stageList}
      <StageCreator projectId={projectId} />
    </div>
  );
}
