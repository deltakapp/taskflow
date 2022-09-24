/* Implements useDrag from react-dnd for drag-and-drop */

import { useDrag } from "react-dnd";

export default function useCustomDrag(itemType, index) {
  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    item: () => {
      return { index };
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  });

  return [drag, isDragging];
}
