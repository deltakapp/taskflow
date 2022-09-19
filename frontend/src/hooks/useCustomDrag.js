/* Implements useDrag from react-dnd for drag-and-drop */

/* todo: switch to dndkit */

import { useDrag } from "react-dnd";

export default function useCustomDrag(itemType, index, canDrag = true) {
  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    item: () => {
      return { index };
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
    /* inhibit dragging if canDrag === false */
    canDrag: (monitor) => {
      if (canDrag === false) {
        return false;
      } else return true;
    },
  });

  return [drag, isDragging];
}
