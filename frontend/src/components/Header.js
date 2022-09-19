import useLogout from "../hooks/useLogout";
import UserPanel from "./UserPanel";

export default function Header() {
  useLogout();

  return (
    <header>
      <div id="app-title">
        <img className="logo" alt="logo" src="/logo-smol.png" />
      </div>
      <UserPanel />
    </header>
  );
}
