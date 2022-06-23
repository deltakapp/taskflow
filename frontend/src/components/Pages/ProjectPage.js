/* Main Component displays either project interface or project selection menu */

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "../Navbar";
import PageHeader from "../PageHeader";
import ProjectBoard from "../ProjectBoard";

export default function ProjectPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageHeader />
      <Navbar />
      <main>
        <ProjectBoard />
      </main>
    </DndProvider>
  );
}
