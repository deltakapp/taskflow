/* This component displays user.name and a logout button if */
/* user is logged in, and a login link otherwise */
/* This is meant as a subcomponent of PageHeader */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserTab.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function UserTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual); // TODO: remove shallowequal
  const token = useSelector((state) => state.token);

  /* navigate to user page on click */
  function handleNavUserPanel(e) {
    e.preventDefault();
    dispatch({ type: "project/unloaded" });
    navigate(`/user/${user.id}`);
  }

  async function logoutUser() {
    console.log("logging out user");
    const request = createRequest("POST", token);
    const response = await fetch(`${URL}/api/users/logout`, request);
    console.log(request);
    console.log(response);
    setTimeout(() => {
      dispatch({ type: "user/loggedOut" });
    }, 500);
  }

  if (user.id) {
    return (
      <div id="user-tab">
        <button id="btn-user-name" onClick={handleNavUserPanel}>
          {user.name || "Anonymous User"}
        </button>
        <div id="user-panel">
          <Link to={`/user/${user.id}/settings`}>Settings</Link>

          <Link to={`/user/${user.id}/projects`}>My Projects</Link>

          <button onClick={() => logoutUser()} id="btn-logout">
            Log Out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="user-tab">
        <Link to="login" id="btn-login">
          Log In
        </Link>
      </div>
    );
  }
}
