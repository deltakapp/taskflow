import { useSelector } from "react-redux";
import useCheckUser from "../hooks/useCheckUser";
import "../styles/PageHeader.css";
import UserTab from "./UserTab";

export default function PageHeader() {
  useCheckUser();
  const projectTitle = useSelector((state) => state.project.projectId);

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
