/* Implements useDrop from react-dnd for horizontal drag-and-drop */

import { useDrop } from "react-dnd";

export default function useHorizontalDrop(
  itemType,
  index,
  reorderProjects,
  ref
) {
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
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the item's width
      // When dragging leftwards, only move when the cursor is left of 50%
      // When dragging rightwards, only move when the cursor is right 50%
      if (sourceIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (sourceIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Reorder projects if all above checks have passed
      reorderProjects(sourceIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return drop;
}
