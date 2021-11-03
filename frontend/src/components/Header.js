import { shallowEqual, useSelector } from "react-redux";
import "../styles/Header.css";

export default function Header() {
  const user = useSelector((state) => state.user, shallowEqual);
  const projectTitle = useSelector((state) => state.project.id);

  return (
    <header>
      <h1 id="app-title">{projectTitle || "Taskflow"}</h1>
      {!projectTitle && (
        <h2 id="app-subtitle">Collaborative Project Management</h2>
      )}
    </header>
  );
}
