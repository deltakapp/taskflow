/* A tab that lists a projects's title. */
/* These tabs implement Drag and Drop horizontally */

/* TODO: memoize this component */

import { useRef } from "react";
import useCustomDrag from "../hooks/useCustomDrag";
import useHorizontalDrop from "../hooks/useHorizontalDrop";
import { itemTypes } from "../utils/itemTypes";

export default function ProjectTab({
  index,
  title,
  projectId,
  isActiveProject,
  reorderProjects,
  loadProject,
}) {
  const tabRef = useRef(null);

  const [drag, isDragging] = useCustomDrag(itemTypes.PROJECTTAB, index);

  const drop = useHorizontalDrop(
    itemTypes.PROJECTTAB,
    index,
    reorderProjects,
    tabRef
  );

  drag(drop(tabRef));

  return (
    <li
      ref={tabRef}
      className={isActiveProject ? "active tab" : "inactive tab"}
      onClick={() => loadProject(projectId)}
      style={{ opacity: isDragging ? 0 : 1 }}
      title={`Open ${title} or drag to rearrange`}
    >
      {title}
    </li>
  );
}
