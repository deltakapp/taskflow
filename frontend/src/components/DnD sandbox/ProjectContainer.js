import update from "immutability-helper";
import { useCallback, useState } from "react";
import Project from "./Project.js";

const style = { width: 1800 };

export default function ProjectContainer() {
  const [projects, setProjects] = useState([
    { id: 1, text: "Write a cool JS library" },
    { id: 2, text: "Make it generic enough" },
    { id: 3, text: "Write README" },
    { id: 4, text: "Create some examples" },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    { id: 6, text: "???" },
    { id: 7, text: "PROFIT" },
  ]);
  const moveProject = useCallback((dragIndex, hoverIndex) => {
    setProjects((prevProjects) =>
      update(prevProjects, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevProjects[dragIndex]],
        ],
      })
    );
  }, []);
  const renderProject = useCallback((project, index) => {
    return (
      <Project
        key={project.id}
        index={index}
        id={project.id}
        text={project.text}
        moveProject={moveProject}
      />
    );
  }, []);
  return (
    <div id="project-container" style={style}>
      {projects.map((project, i) => renderProject(project, i))}
    </div>
  );
}
