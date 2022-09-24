/* This is an invisible area at the bottom of Stages to allow Tasks to be */
/* Dropped in and added to the end of Stage.tasks */

import { useRef } from "react";
import { useDrop } from "react-dnd";
import { itemTypes } from "../utils/itemTypes";

export default function DropTaskTarget({ stageId, moveTask }) {
  const dropTargetRef = useRef(null);

  const [, drop] = useDrop({
    accept: itemTypes.TASK,
    drop(item, monitor) {
      moveTask(item.taskId, item.stageId, stageId, -1); // index -1 adds task to end of tasks array
    },
  });

  drop(dropTargetRef);

  return <div className="drop-task-target" ref={dropTargetRef}></div>;
}
