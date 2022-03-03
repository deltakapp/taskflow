/* Main Component displays either project interface or project selection menu */

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { shallowEqual, useSelector } from "react-redux";
import "../../styles/ProjectPage.css";
import Navbar from "../Navbar";
import PageHeader from "../PageHeader";
import Stage from "../Stage";
import StageCreator from "../StageCreator";

export default function ProjectPage() {
  const projectId = useSelector((state) => state.project.id);
  const stages = useSelector((state) => state.project.stages, shallowEqual);

  const stageList = stages
    ? stages.map((stage, index) => {
        return (
          <Stage
            key={stage.id}
            id={stage.id}
            stageIndex={index}
            projectId={projectId}
          />
        );
      })
    : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <PageHeader />
      <Navbar />
      <main>
        <div id="project-board">
          <div id="stages-panel">
            {stageList}
            {/* {projectId ? <StageList /> : <ProjectsList />}
            <hr /> */}
            <StageCreator projectId={projectId} />
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
