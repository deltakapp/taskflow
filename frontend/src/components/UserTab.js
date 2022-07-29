/* This component displays user.name and a logout button if */
/* user is logged in, and a login link otherwise */
/* This is meant as a subcomponent of PageHeader */

import { shallowEqual, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/UserTab.css";

export default function UserTab() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual); // TODO: remove shallowequal

  /* navigate to user page on click */
  function handleNavUserPanel(e) {
    e.preventDefault();
    dispatch({ type: "project/unloaded" });
    navigate(`/users/${user.id}`);
  }

  async function logoutUser() {
    const request = createRequest("POST", token);
    const response = await fetch(`${PATH}/users/logout`, request);
    if (!response.ok) console.log(response);

    setTimeout(() => {
      dispatch({ type: "user/loggedOut" });
    }, 500);
  }

  if (user.flag === "TEMP") {
    return (
      <div id="user-tab">
        <button id="btn-user-name" onClick={handleNavUserPanel}>
          {user.name || "Anonymous User"}
        </button>
        <div id="user-panel">
          <button onClick={() => navigate(`/preview/${user.id}/signup`)}>
            Sign Up
          </button>
          <button onClick={() => navigate(`/preview/${user.id}/projects`)}>
            My Projects
          </button>

          <button onClick={() => logoutUser()} id="btn-logout">
            Log Out
          </button>
        </div>
      </div>
    );
  } else if (user.id) {
    return (
      <div id="user-tab">
        <button id="btn-user-name" onClick={handleNavUserPanel}>
          {user.name || "Anonymous User"}
        </button>
        <div id="user-panel">
          <button onClick={() => navigate(`/users/${user.id}/settings`)}>
            Settings
          </button>
          <button onClick={() => navigate(`/users/${user.id}/projects`)}>
            My Projects
          </button>

          <button onClick={() => logoutUser()} id="btn-logout">
            Log Out
          </button>
        </div>
      </div>
    );
  } else {
    /* if user is logged out */
    return (
      <div id="user-tab">
        <Link to="login" id="btn-login">
          Log In
        </Link>
      </div>
    );
  }
}
