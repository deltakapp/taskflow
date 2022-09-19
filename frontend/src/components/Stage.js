/* A stage of a project. */
/* These stages implement Drag and Drop horizontally*/

import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCustomDrag from "../hooks/useCustomDrag";
import useHorizontalDrop from "../hooks/useHorizontalDrop";
import useRequestTools from "../hooks/useRequestTools";
import useVerticalDrop from "../hooks/useVerticalDrop";
import { ItemTypes } from "../utils/itemTypes";
import StageEditor from "./StageEditor";
import Task from "./Task";
import TaskEditor from "./TaskEditor";

export default function Stage({
  stageId,
  stageIndex,
  projectId,
  reorderStages,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const stageRef = useRef(null);
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector((state) => state.project.stages[stageIndex].tasks);

  const [isTaskCreatorOpen, toggleTaskCreator] = useState(false); // toggle task creator open or closed
  const [isStageEditorOpen, toggleStageEditor] = useState(false);

  /* Accept Drag-and-drop in both horizontal and vertical directions */
  const [drag, isDragging] = useCustomDrag(ItemTypes.STAGE, stageIndex);
  const horizontalDrop = useHorizontalDrop(
    ItemTypes.STAGE,
    stageIndex,
    reorderStages,
    stageRef
  );
  const verticalDrop = useVerticalDrop(
    ItemTypes.STAGE,
    stageIndex,
    reorderStages,
    stageRef
  );
  drag(horizontalDrop(stageRef));
  drag(verticalDrop(stageRef));

  /* Reorder tasks */
  const reorderTasks = useCallback(
    async (sourceIndex, hoverIndex) => {
      if (!token) return; // abort if user logged out
      const newTasks = [...tasks]; // copy state for mutations
      newTasks.splice(hoverIndex, 0, newTasks.splice(sourceIndex, 1)[0]);

      /* dispatch reorder to redux state (optimistic update for performance) */
      dispatch({
        type: "stage/reorderTasks",
        payload: { stageId: stageId, tasks: newTasks },
      });

      /* send API request */
      const request = createRequest("PATCH", token, {
        tasks: newTasks,
      });
      const response = await fetch(`${PATH}/stages/${stageId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        if (token) dispatch({ type: "token/refresh", token: token });
      } else handleApiError(response);
    },
    [tasks, token, stageId, dispatch, PATH, createRequest, handleApiError] //dependency array
  );

  async function handleDeleteStage() {
    if (window.confirm(`Delete stage ${stage.title} ?`)) {
      const request = createRequest("DELETE", token);
      const response = await fetch(`${PATH}/stages/${stageId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        dispatch({
          type: "stage/deleted",
          payload: { stageId: stageId },
          token: token,
        });
      } else handleApiError(response);
    } else return; // Abort if user does not confirm
  }

  const taskList = tasks ? (
    tasks.map((task, index) => {
      return (
        <Task
          key={task.taskId}
          taskId={task.taskId}
          taskIndex={index}
          stageId={stageId}
          stageIndex={stageIndex}
          reorderTasks={reorderTasks}
        />
      );
    })
  ) : (
    /* display only page break if no tasks exist */
    <br />
  );

  return (
    <section
      className="stage"
      key={stageId}
      ref={stageRef}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <div className="stage-header">
        <button
          className="btn-toggle-task-creator"
          onClick={() => toggleTaskCreator(true)}
          title="Add a new task"
        >
          ➕
        </button>
        {isStageEditorOpen ? (
          <StageEditor
            stageId={stageId}
            title={stage.title}
            toggleStageEditor={toggleStageEditor}
          />
        ) : (
          <h3
            className="stage-title"
            title="Click and drag to rearrange stages"
          >
            {stage.title}
          </h3>
        )}
        <div className="dropdown stage-options">
          <button className="btn-stage-options">☰</button>
          <div className="dropdown-menu">
            <button onClick={() => toggleStageEditor(true)}>
              Rename Stage
            </button>
            <button onClick={() => handleDeleteStage()}>Delete Stage</button>
          </div>
        </div>
      </div>
      {isTaskCreatorOpen && (
        <TaskEditor // TaskEditor serves as TaskCreator, given unique props
          taskId={null}
          title={null}
          details={null}
          stageId={stageId}
          toggleTaskEditor={toggleTaskCreator} // toggleTaskCreator in place of toggleTaskEditor
        />
      )}
      {taskList}
    </section>
  );
}
