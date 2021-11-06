import { useSelector } from "react-redux";
import "../styles/Header.css";
import UserTab from "./UserTab";

export default function HomeHeader() {
  const projectTitle = useSelector((state) => state.project.id);

  return (
    <header id="header">
      <h1 id="app-title">{projectTitle || "Taskflow"}</h1>
      <UserTab />
      {!projectTitle && (
        <h2 id="app-subtitle">Collaborative Project Management</h2>
      )}
    </header>
  );
}
