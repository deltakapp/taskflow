/* This component displays user.name and a logout button if */
/* user is logged in, and a login link otherwise */
/* This is meant as a subcomponent of PageHeader */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function UserPanel() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  async function logoutUser() {
    if (user.flag === "TEMP") {
      if (
        !window.confirm(
          "Do you want to log out? Your work will not be saved because you haven't created an account."
        )
      )
        return;
    }
    const request = createRequest("POST", token);
    const response = await fetch(`${PATH}/users/logout`, request);
    if (response.ok) {
      navigate("/logout");
    } else handleApiError(response);

    setTimeout(() => {
      dispatch({ type: "user/loggedOut" });
    }, 500);
  }

  if (user.flag === "TEMP") {
    return (
      <div className="dropdown user-panel">
        <button id="btn-user-name">{user.name || "Anonymous User"}</button>
        <div className="dropdown-menu">
          <button onClick={() => navigate(`/users/${user.id}/signup`)}>
            Sign Up
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
    return (
      <div className="dropdown user-panel">
        <button id="btn-user-name">{user.name || "Anonymous User"}</button>
        <div className="dropdown-menu">
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
  }
}
