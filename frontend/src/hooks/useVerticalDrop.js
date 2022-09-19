/* Implements useDrop from react-dnd for vertical drag-and-drop */

import { useDrop } from "react-dnd";

export default function useVerticalDrop(itemType, index, reorderProjects, ref) {
  const [, drop] = useDrop({
    accept: itemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // The source index where item is being dragged from
      const sourceIndex = item.index;
      // Index of current hover position
      const hoverIndex = index;
      // Don't replace items with themselves
      if (sourceIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.Y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (sourceIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (sourceIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Reorder projects if all above checks have passed
      reorderProjects(sourceIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return drop;
}
