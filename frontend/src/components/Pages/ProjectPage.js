/* Main Component displays either project interface or project selection menu */
import { shallowEqual, useSelector } from "react-redux";
import "../../styles/ProjectPage.css";
import useCheckUser from "../../utils/useCheckUser";
import Navbar from "../Navbar";
import Stage from "../Stage";
import StageCreator from "../StageCreator";

export default function ProjectPage() {
  const projectId = useSelector((state) => state.project.id);
  const stages = useSelector((state) => state.project.stages, shallowEqual);

  useCheckUser();

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
    <>
      <Navbar />
      <main id="project-board">
        <div id="stages-panel">{stageList}</div>
        <hr />
        {/* {projectId ? <StageList /> : <ProjectsList />}
        <hr /> */}
      </main>
      <StageCreator projectId={projectId} />
    </>
  );
}
