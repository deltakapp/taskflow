import { useSelector } from "react-redux";
import "../styles/PageHeader.css";
import UserTab from "./UserTab";

export default function PageHeader() {
  const projectTitle = useSelector((state) => state.project.id);

  return (
    <header id="page-header">
      <h1 id="app-title">{projectTitle || "Taskflow"}</h1>
      <UserTab />
      {!projectTitle && (
        <h2 id="app-subtitle">Collaborative Project Management</h2>
      )}
    </header>
  );
}
