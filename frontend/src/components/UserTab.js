import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserTab.css";

export default function UserTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  function handleNavUserPanel(e) {
    e.preventDefault();
    dispatch({ type: "project/unloaded" });
    navigate(`user/${user.id}`);
  }

  return user.id ? (
    <div id="user-tab" className="float-right">
      <button id="btn-user" onClick={handleNavUserPanel}>
        {user.name || "Anonymous User"}
      </button>
      <Link to="logout" id="btn-logout">
        Log Out
      </Link>
    </div>
  ) : (
    <div id="user-tab">
      <Link to="login" id="btn-login">
        Log In
      </Link>
    </div>
  );
}
