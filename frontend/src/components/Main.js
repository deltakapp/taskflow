/* Main Component displays either project interface or project selection menu */
import { useSelector } from "react-redux";
import ProjectsList from "./ProjectsList";
import Stages from "./Stages";

export default function Main() {
  const projectId = useSelector((state) => state.project.id);

  return (
    <main id="project viewport">
      {projectId ? <Stages /> : <ProjectsList />}
    </main>
  );
}
