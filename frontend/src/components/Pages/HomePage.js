import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useRequestTools from "../../hooks/useRequestTools";

export default function HomePage() {
  const [createRequest, dispatch, handleApiError, PATH] = useRequestTools();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  /* Upon login navigate to user page */
  useEffect(() => {
    if (user.id) navigate(`../user/${user.id}`);
  }, [user.id, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("user-email");
    const password = document.getElementById("user-password");

    const request = createRequest("POST", null, {
      email: email.value,
      password: password.value,
    });

    const response = await fetch(`${PATH}/users/login`, request);
    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: "user/loggedIn",
        payload: result.user,
        token: result.token,
      });
      // navigate(`../user/${user.id}`);
    } else handleApiError(response);

    email.value = ""; // reset credential fields
    password.value = "";
  }

  return (
    <main className="single">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <h1>
        <a href="/">Taskflow.tech</a>
      </h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input id="user-email" type="text" placeholder="E-mail" />
        <input id="user-password" type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <h3>
        <Link to="/signup">Sign Up</Link>
      </h3>
      <br />
      <h3>
        <Link to="/preview">Preview the App</Link>
      </h3>
    </main>
  );
}
