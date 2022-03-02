import { useSelector } from "react-redux";
import "../styles/PageHeader.css";
import UserTab from "./UserTab";

export default function PageHeader() {
  const projectTitle = useSelector((state) => state.project.id);

  console.log("rendering PageHeader");

  return (
    <header id="page-header">
      <img className="logo" alt="logo" src="/logo-smol.png" />
      <UserTab />
      {!projectTitle && (
        <h2 id="app-subtitle">Collaborative Project Management</h2>
      )}
    </header>
  );
}
