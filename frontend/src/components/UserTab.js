/* This component displays user.name and a logout button if */
/* user is logged in, and a login link otherwise */
/* This is meant as a subcomponent of PageHeader */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserTab.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function UserTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  console.log("rendering userTab");

  /* navigate to user page on click */
  function handleNavUserPanel(e) {
    e.preventDefault();
    dispatch({ type: "project/unloaded" });
    navigate(`user/${user.id}`);
  }

  async function logoutUser() {
    console.log("logging out user");
    const request = {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const response = await fetch(`${URL}/api/users/logout`, request);
    console.log(response);
    dispatch({ type: "user/loggedOut" });
  }

  return user.id ? (
    <div id="user-tab" className="float-right">
      <button id="btn-user" onClick={handleNavUserPanel}>
        {user.name || "Anonymous User"}
      </button>
      <button onClick={() => logoutUser()} id="btn-logout">
        Log Out
      </button>
    </div>
  ) : (
    <div id="user-tab">
      <Link to="login" id="btn-login">
        Log In
      </Link>
    </div>
  );
}
