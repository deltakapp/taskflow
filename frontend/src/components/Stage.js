import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";
import { ItemTypes } from "../utils/itemTypes";
import StageEditor from "./StageEditor";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";

export default function Stage({ stageId, stageIndex, title, reorderStages }) {
  console.log(`Rendering stage ${title}`);
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector(
    (state) => state.project.stages[stageIndex].tasks,
    shallowEqual
  );
  const token = useSelector((state) => state.token);
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

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  async function handleDeleteStage(stageId) {
    const request = createRequest("DELETE", token);
    const response = await fetch(`${URL}/api/stages/${stageId}`, request);
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { stageId: stageId } });
    } else {
      console.log(response.status);
    }
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
        <details className="dropdown">
          {" "}
          {/*TODO: change from css toggle to react toggle */}
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
            <TaskCreator stageId={stageId} stageIndex={stageIndex} />
          </summary>
          <span className="dropdown-content mt-4">
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
          </span>
        </details>
      </div>
      {taskList}
    </section>
  );
}
