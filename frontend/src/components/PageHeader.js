import { useSelector } from "react-redux";
import "../styles/PageHeader.css";
import UserTab from "./UserTab";

export default function PageHeader() {
  const projectTitle = useSelector((state) => state.project.id);
	
      //<h1 id="app-title">{projectTitle || "Taskflow"}</h1>

  return (
    <header id="page-header">
      <img class="logo" src="/logo-smol.png" />
      <UserTab />
      {!projectTitle && (
        <h2 id="app-subtitle">Collaborative Project Management</h2>
      )}
    </header>
  );
}
