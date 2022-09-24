/* A task within a stage */
/* This implements Drag and Drop */

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useRequestTools from "../hooks/useRequestTools";
import TaskEditor from "./TaskEditor";

// import { useDrag, useDrop } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";
import { itemTypes } from "../utils/itemTypes";

export default function Task({
  taskId,
  taskIndex,
  stageId,
  stageIndex,
  nextStageId,
  reorderTasks,
  moveTask,
}) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const task = useSelector(
    (state) => state.project.stages[stageIndex].tasks[taskIndex]
  );
  const stages = useSelector((state) => state.project.stages);
  const [isTaskEditorOpen, toggleTaskEditor] = useState(false);
  const taskRef = useRef(null);

  /*** Drag and Drop ***/

  /* Declare tasks to be draggable */
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.TASK,
    item: () => ({ taskIndex, taskId, stageId }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  /* Declare tasks as droppable targets for tasks */
  const [, drop] = useDrop({
    accept: itemTypes.TASK,
    hover(item, monitor) {
      if (!taskRef.current) {
        return;
      }
      if (item.stageId !== stageId) return; // do not hover for tasks from other stages
      // The source index where task is being dragged from
      const sourceIndex = item.taskIndex;
      // Index of current hover position
      const hoverIndex = taskIndex;
      // Don't replace tasks with themselves
      if (sourceIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = taskRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.Y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the task's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (sourceIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (sourceIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Reorder tasks if all above checks have passed
      reorderTasks(sourceIndex, hoverIndex);
      item.taskIndex = hoverIndex;
    },
    drop(item, monitor) {
      moveTask(item.taskId, item.stageId, stageId, taskIndex);
    },
  });

  /* Enable Drag and Drop of tasks */
  drag(drop(taskRef));

  async function markTaskComplete() {
    /* Check existence of next stage */
    if (nextStageId) {
      /* If next stage exists, create task in new stage */
      console.log(stages);
      console.log(nextStageId);
      const request = createRequest("POST", token, {
        title: task.title,
        details: task.details,
      });
      const response = await fetch(
        `${PATH}/stages/${nextStageId}/tasks`,
        request
      );
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        const result = await response.json();
        dispatch({
          type: "task/created",
          payload: { task: result, stageId: nextStageId },
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
      <div
        className="task"
        ref={taskRef}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
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
