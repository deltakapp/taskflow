/* This page should contain user settings control as well as list of projects */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/UserPage.css";
import PageHeader from "../PageHeader";
import UserSettings from "../UserSettings";

export default function UserPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <PageHeader></PageHeader>
      <nav id="mode-selector">
        <button onClick={() => navigate(`/user/${user.id}/projects`)}>
          My Projects
        </button>
        <button>User Settings</button>
      </nav>
      <UserSettings />
    </>
  );
}
