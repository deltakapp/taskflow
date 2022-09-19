/* A task within a stage */
/* This implements Drag and Drop vertically */

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCustomDrag from "../hooks/useCustomDrag";
import useRequestTools from "../hooks/useRequestTools";
import useVerticalDrop from "../hooks/useVerticalDrop";
import { ItemTypes } from "../utils/itemTypes";
import TaskEditor from "./TaskEditor";

export default function Task({
  taskId,
  taskIndex,
  stageId,
  stageIndex,
  reorderTasks,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const ref = useRef(null);
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const stages = useSelector((state) => state.project.stages);

  const [isTaskEditorOpen, toggleTaskEditor] = useState(false);

  /* Accept Drag-and-drop in vertical direction */
  const [drag, isDragging] = useCustomDrag(ItemTypes.TASK, taskIndex);
  const verticalDrop = useVerticalDrop(
    ItemTypes.TASK,
    taskIndex,
    reorderTasks,
    ref
  );
  drag(verticalDrop(ref));

  async function markTaskComplete() {
    /* Check existence of next stage */
    if (stages.length - 1 !== stageIndex) {
      /* If next stage exists, create task in new stage */
      console.log(stages);
      const newStageId = stages[stageIndex + 1].stageId;
      const request = createRequest("POST", token, {
        title: task.title,
        details: task.details,
      });
      const response = await fetch(
        `${PATH}/stages/${newStageId}/tasks`,
        request
      );
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        const result = await response.json();
        dispatch({
          type: "task/created",
          payload: { task: result, stageId: newStageId },
          token: token,
        });
      } else handleApiError(response);
    } /* If next stage doesn't exist, check if user wants to delete task*/ else {
      if (
        !window.confirm(
          `Task ${task.title} is in final stage. Do you want to delete it?`
        )
      )
        return; // abort function if user doesn't want to delete task
    }

    /* Delete current version of task */
    const request = createRequest("DELETE", token);
    const response = await fetch(
      `${PATH}/stages/${stageId}/tasks/${taskId}`,
      request
    );
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      dispatch({
        type: "task/deleted",
        payload: { stageId: stageId, taskId: taskId },
        token: token,
      });
    } else handleApiError(response);
  }

  async function handleDeleteTask() {
    if (window.confirm("Delete this task?")) {
      const request = createRequest("DELETE", token);
      const response = await fetch(
        `${PATH}/stages/${stageId}/tasks/${taskId}`,
        request
      );
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        dispatch({
          type: "task/deleted",
          payload: { stageId: stageId, taskId: taskId },
          token: token,
        });
      } else handleApiError(response);
    } else return; // Abort if user does not confirm
  }

  if (isTaskEditorOpen) {
    return (
      <TaskEditor
        taskId={taskId}
        title={task.title}
        details={task.details}
        stageId={stageId}
        toggleTaskEditor={toggleTaskEditor}
      />
    );
  } else {
    return (
      <div className="task" ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="task-header">
          <p className="task-title">{task.title}</p>
          <div className="dropdown task-options">
            <button className="btn-task-options">☰</button>
            <div className="dropdown-menu">
              <button
                className="btn-mark-task-complete"
                onClick={() => markTaskComplete()}
              >
                Mark Complete
              </button>
              <button
                className="btn-open-task-editor"
                onClick={() => toggleTaskEditor(true)}
              >
                Edit Task
              </button>
              <button
                className="btn-delete-task"
                onClick={() => handleDeleteTask()}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
        {/* Discard details if empty to preserve aesthetic formatting */}
        {task.details && <p className="task-details">{task.details}</p>}
      </div>
    );
  }
}
