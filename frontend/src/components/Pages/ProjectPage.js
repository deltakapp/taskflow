/* Main Component displays project interface */

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "../Header";
import Navbar from "../Navbar";
import ProjectBoard from "../ProjectBoard";

export default function ProjectPage() {
  const [isStageCreatorOpen, toggleStageCreator] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Navbar />
      <ProjectBoard
        isStageCreatorOpen={isStageCreatorOpen}
        toggleStageCreator={toggleStageCreator}
      />
      <button
        id="btn-open-stage-creator"
        onClick={() => toggleStageCreator(true)}
      >
        ➕ Add Stage
      </button>
    </DndProvider>
  );
}
