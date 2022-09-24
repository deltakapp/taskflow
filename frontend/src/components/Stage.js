/* A stage of a project. */
/* These stages implement Drag and Drop horizontally*/

import { useCallback, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import useCustomDrag from "../hooks/useCustomDrag";
import useHorizontalDrop from "../hooks/useHorizontalDrop";
import useRequestTools from "../hooks/useRequestTools";
import useVerticalDrop from "../hooks/useVerticalDrop";
import { itemTypes } from "../utils/itemTypes";
import DropTaskTarget from "./DropTaskTarget";
import StageEditor from "./StageEditor";
import Task from "./Task";
import TaskEditor from "./TaskEditor";

export default function Stage({
  stageId,
  stageIndex,
  nextStageId,
  reorderStages,
  requestPatchStages,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector((state) => state.project.stages[stageIndex].tasks);

  const [isTaskCreatorOpen, toggleTaskCreator] = useState(false); // toggle task creator open or closed
  const [isStageEditorOpen, toggleStageEditor] = useState(false); // toggle stage editor open or closed

  /* Accept Stages Drag-and-drop in both horizontal and vertical directions */
  const stageRef = useRef(null);
  const [dragStage, isDragging] = useCustomDrag(itemTypes.STAGE, stageIndex);
  const horizontalDropStages = useHorizontalDrop(
    itemTypes.STAGE,
    stageIndex,
    reorderStages,
    stageRef
  );
  const verticalDropStages = useVerticalDrop(
    itemTypes.STAGE,
    stageIndex,
    reorderStages,
    stageRef
  );
  dragStage(horizontalDropStages(stageRef));
  dragStage(verticalDropStages(stageRef));

  /* Stage Header accepts tasks dropped from other stages */
  const stageHeaderRef = useRef(null);
  const [, dropTasks] = useDrop({
    accept: itemTypes.TASK,
    drop(item, monitor) {
      moveTask(item.taskId, item.stageId, stageId, 0); // index 0 adds task to top of array
    },
  });
  dropTasks(stageHeaderRef);

  /* Updates state and server when a task is dropped from another stage */
  const moveTask = async (taskId, oldStageId, newStageId, newTaskIndex) => {
    dispatch({
      type: "project/moveTask",
      payload: {
        taskId: taskId,
        oldStageId: oldStageId,
        newStageId: newStageId,
        newTaskIndex: newTaskIndex,
      },
    });
    /* send API request */
    /* If move was internal to one stage, patch that stage. otherwise, patch project */
    if (oldStageId === newStageId) {
      const request = createRequest("PATCH", token, {
        tasks: tasks,
      });
      const response = await fetch(`${PATH}/stages/${stageId}`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        if (token) dispatch({ type: "token/refresh", token: token });
      } else handleApiError(response);
    } else requestPatchStages(); // if task moved to another stage, patch project
  };

  /* Reorder tasks */
  /* This is a UI-only update called frequently while dragging a task */
  const reorderTasks = useCallback(
    async (sourceIndex, hoverIndex) => {
      if (!token) return; // abort if user logged out
      const newTasks = [...tasks]; // copy state for mutations
      newTasks.splice(hoverIndex, 0, newTasks.splice(sourceIndex, 1)[0]);

      /* dispatch reorder to redux state */
      dispatch({
        type: "stage/reorderTasks",
        payload: { stageId: stageId, tasks: newTasks },
      });
    },
    [tasks, token, stageId, dispatch] //dependency array
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

  const taskList =
    !!tasks.length && // if any tasks exist, map Task components
    tasks.map((task, index) => {
      return (
        <Task
          key={task.taskId}
          taskId={task.taskId}
          taskIndex={index}
          stageId={stageId}
          stageIndex={stageIndex}
          nextStageId={nextStageId}
          reorderTasks={reorderTasks}
          moveTask={moveTask}
        />
      );
    });

  return (
    <section
      className="stage"
      key={stageId}
      ref={stageRef}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <div className="stage-header" ref={stageHeaderRef}>
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
      <DropTaskTarget stageId={stageId} moveTask={moveTask} />
    </section>
  );
}
