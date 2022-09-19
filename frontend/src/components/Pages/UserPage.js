/* This page contains user settings control as well as list of projects */

import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Header";

export default function UserPage() {
  const user = useSelector((state) => state.user);

  let activeStyle = {
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    color: "#000000",
  };
  let inactiveStyle = {
    color: "#444444",
  };

  const userSettingsButton =
    user.flag === "TEMP" ? (
      <NavLink
        to="signup"
        className="tab"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Sign Up
      </NavLink>
    ) : (
      <NavLink
        to="settings"
        className="tab"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        User Settings
      </NavLink>
    );

  return (
    <>
      <Header />
      <nav id="user-tabs" className="tab-row">
        <NavLink
          className="tab"
          to="projects"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          My Projects
        </NavLink>
        {userSettingsButton}
      </nav>
      <main className="user-page">
        <br />
        <Outlet />
      </main>
    </>
  );
}
