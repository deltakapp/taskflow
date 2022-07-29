/* This page should contain user settings control as well as list of projects */

import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
// import "../../styles/Pages/UserPage.css";
import "../../styles/Pages/UserPage.css";
import PageHeader from "../PageHeader";

export default function UserPage() {
  const user = useSelector((state) => state.user);

  let activeStyle = {
    fontWeight: "bold",
    color: "black",
    textDecoration: "none",
  };
  let inactiveStyle = {
    color: "blue",
    textDecoration: "underline",
  };

  const userSettingsButton =
    user.flag === "TEMP" ? (
      <li>
        <NavLink
          to="signup"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          Sign Up
        </NavLink>
      </li>
    ) : (
      <NavLink
        to="settings"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        User Settings
      </NavLink>
    );

  return (
    <main>
      <PageHeader></PageHeader>
      <nav id="user-mode-selector">
        <ul id="user-modes">
          <li>
            <NavLink
              to="projects"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              My Projects
            </NavLink>
          </li>
          {userSettingsButton}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </main>
  );
}
