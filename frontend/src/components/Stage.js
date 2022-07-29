/* A stage of a project. */
/* These stages implement Drag and Drop horizontally*/

import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/Stage.css";
import { ItemTypes } from "../utils/itemTypes";
import StageEditor from "./StageEditor";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";

export default function Stage({ stageId, stageIndex, title, reorderStages }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const ref = useRef(null);
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector((state) => state.project.stages[stageIndex].tasks);
  const [isTaskCreatorOpen, toggleTaskCreator] = useState(false); // toggle task creator open or closed

  const [, drop] = useDrop({
    accept: ItemTypes.STAGE, //change PROJECT to PROJECTTAB
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // The source index where item is being dragged from
      const sourceIndex = item.index;
      // Index of current hover position
      const hoverIndex = stageIndex;
      // Don't replace items with themselves
      if (sourceIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      //Only perform the move when the mouse has crossed half of the item's height
      // When dragging leftwards, only move when the cursor is left of 50%
      // When dragging downwards, only move when the cursor is above 50%
      if (sourceIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (sourceIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      reorderStages(sourceIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.STAGE,
    item: () => {
      return { title, stageIndex };
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  });

  // const opacity = isDragging ? 0 : 1; // TODO: change from css toggle to react

  drag(drop(ref));

  async function handleDeleteStage(stageId) {
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
  }

  const taskList = tasks
    ? tasks.map((task, index) => {
        return (
          <TaskCard
            key={task.taskId}
            taskId={task.taskId}
            taskIndex={index}
            stageId={stageId}
            stageIndex={stageIndex}
          />
        );
      })
    : null;

  return (
    <section className="stage" key={stageId} ref={ref}>
      <div className="stage-header">
        <h3 className="stage-title">{stage.title}</h3>
        {!isTaskCreatorOpen && (
          <div className="stage-options">
            <div
              className="btn-toggle-task-creator"
              onClick={() => toggleTaskCreator(true)}
            >
              ➕
            </div>
            <div className="dropdown">
              ☰
              <div className="dropdown-content mt-4">
                <ul>
                  <li>
                    <StageEditor stageId={stageId} />
                  </li>
                  <li>
                    <button
                      className="btn"
                      onClick={() => handleDeleteStage(stageId)}
                    >
                      Delete Stage
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {isTaskCreatorOpen && (
          <TaskCreator
            stageId={stageId}
            toggleTaskCreator={toggleTaskCreator}
          />
        )}
      </div>
      {taskList}
    </section>
  );
}
