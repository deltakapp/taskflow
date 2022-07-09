/* This page should contain user settings control as well as list of projects */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/UserPage.css";
import PageHeader from "../PageHeader";
import ProjectsMenu from "../ProjectsMenu";

export default function UserPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <>
      <PageHeader></PageHeader>
      <nav id="mode-selector">
        <button>My Projects</button>
        <button onClick={() => navigate(`/user/${user.id}/settings`)}>
          Settings
        </button>
      </nav>
      <ProjectsMenu />
    </>
  );
}
