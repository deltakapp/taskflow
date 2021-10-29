import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";
import ProjectsList from "./ProjectsList";

export default function UserPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);
  const [showProjectsList, toggleProjectsList] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("user-email");
    const password = document.getElementById("user-password");
    const request = {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    };
    const response = await fetch(`${URL}/api/users/login`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "user/loggedIn",
        payload: { ...result.user, token: result.token },
      });
    } else {
      const result = await response.json();
      console.log(result.message || response);
      dispatch({ type: "user/failedLogin" });
    }
    email.value = "";
    password.value = "";
  }

  async function handleLogout(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const response = await fetch(`${URL}/api/users/logout`, request);
    // TODO: handle rejection for expired token
    if (!response.ok) {
      console.log(response.status);
      const result = await response.json();
      console.log(result.message || response);
      dispatch({
        type: "user/loggedOut",
      });
    } else {
      dispatch({ type: "user/loggedOut" });
    }
  }

  if (user.name) {
    return (
      <div>
        {user.name}
        <button onClick={handleLogout}>Log Out</button>
        <hr />
        <button onClick={() => toggleProjectsList(!showProjectsList)}>
          Toggle Projects List
        </button>
        {showProjectsList && <ProjectsList />}
      </div>
    );
  } else {
    return (
      <div>
        Log In:
        <form onSubmit={handleLogin}>
          <span>User Name: </span>
          <input id="user-name" type="text" />
          <br />
          <span>Email: </span>
          <input id="user-email" type="text" />
          <br />
          <span>Password: </span>
          <input id="user-password" type="text" />
          <button type="login" onClick={handleLogin}>
            Log In
          </button>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
