/* Main Component displays either project interface or project selection menu */
import { useSelector } from "react-redux";
import useCheckUser from "../../utils/useCheckUser";
import Navbar from "../Navbar";
import ProjectsList from "../ProjectsList";
import StageCreator from "../StageCreator";
import StageList from "../StageList";

export default function ProjectPage() {
  const projectId = useSelector((state) => state.project.id);

  useCheckUser();
  return (
    <>
      <Navbar />
      <main id="project-panel">
        {projectId ? <StageList /> : <ProjectsList />}
        <hr />
        <StageCreator projectId={projectId} />
      </main>
    </>
  );
}
