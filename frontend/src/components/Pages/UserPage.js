/* This page should contain user settings control as well as list of projects */

import { useState } from "react";
import "../../styles/UserPage.css";
import PageHeader from "../PageHeader";
import ProjectsMenu from "../ProjectsMenu";
import UserSettings from "../UserSettings";

export default function UserPage() {
  const [mode, setMode] = useState("projects");

  const view = () => {
    switch (mode) {
      case "projects":
        return <ProjectsMenu />;
      case "user settings":
        return <UserSettings />;
      case "connections":
        return <h2>This has not yet been implemented.</h2>;
      case "app settings":
        return <h2>This has not yet been implemented.</h2>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <PageHeader></PageHeader>
      <nav id="mode-selector">
        <button onClick={() => setMode("projects")}>My Projects</button>
        <button onClick={() => setMode("user settings")}>User Settings</button>
      </nav>
      {view()}
    </>
  );
}
