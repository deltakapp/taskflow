import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";
import { ItemTypes } from "../utils/itemTypes";
import StageRename from "./StageRename";
import Task from "./Task";
import TaskCreator from "./TaskCreator";

export default function Stage({
  id,
  stageIndex,
  title,
  projectId,
  reorderStage,
}) {
  console.log(`Rendering stage ${stageIndex}`);
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector((state) => state.project.stages[stageIndex].tasks);
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();
  const ref = useRef(null);

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
      reorderStage(sourceIndex, hoverIndex);
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

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  async function handleDeleteStage(id) {
    const request = createRequest("DELETE", user.token);
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${id}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { id: id } });
    } else {
      console.log(response.status);
    }
  }

  const taskList = tasks
    ? tasks.map((task, index) => {
        return (
          <Task
            key={task.id}
            taskIndex={index}
            stageIndex={stageIndex}
            stageId={id}
            projectId={projectId}
          />
        );
      })
    : null;

  return (
    <section className="stage" key={id} ref={ref}>
      <div className="stage-header">
        <details className="dropdown">
          <summary className="" role="button">
            <h3 className="stage-title">{stage.title}</h3>
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="float-right"
            >
              <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            <TaskCreator
              projectId={projectId}
              stageId={stage.id}
              stageIndex={stageIndex}
            />
          </summary>
          <span className="dropdown-content mt-4">
            <ul>
              <li>
                <StageRename
                  projectId={projectId}
                  stageId={stage.id}
                  stageIndex={stageIndex}
                />
              </li>
              <li>
                <button className="btn" onClick={() => handleDeleteStage(id)}>
                  Delete Stage
                </button>
              </li>
            </ul>
          </span>
        </details>
      </div>
      {taskList}
    </section>
  );
}
