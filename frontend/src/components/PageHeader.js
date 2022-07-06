import useLogout from "../hooks/useLogout";
import "../styles/PageHeader.css";
import UserTab from "./UserTab";

export default function PageHeader() {
  useLogout();

  return (
    <header id="page-header">
      <div id="app-title">
        <img className="logo" alt="logo" src="/logo-smol.png" />
      </div>
      <UserTab />
    </header>
  );
}
