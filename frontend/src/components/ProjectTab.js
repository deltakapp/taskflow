/* A tab that lists a projects's title. */
/* These tabs implement Drag and Drop horizontally */

/* TODO: memoize this component */

import { useRef } from "react";
import useCustomDrag from "../hooks/useCustomDrag";
import useHorizontalDrop from "../hooks/useHorizontalDrop";
import { ItemTypes } from "../utils/itemTypes";

export default function ProjectTab({
  index,
  title,
  projectId,
  isActiveProject,
  reorderProjects,
  loadProject,
}) {
  const ref = useRef(null);

  const [drag, isDragging] = useCustomDrag(ItemTypes.PROJECTTAB, index);

  const drop = useHorizontalDrop(
    ItemTypes.PROJECTTAB,
    index,
    reorderProjects,
    ref
  );

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={isActiveProject ? "active tab" : "inactive tab"}
      onClick={() => loadProject(projectId)}
      style={{ opacity: isDragging ? 0 : 1 }}
      title={`Open ${title} or drag to rearrange`}
    >
      {title}
    </li>
  );
}
