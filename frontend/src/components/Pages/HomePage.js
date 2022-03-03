import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../../utils/apiDomain";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    if (user.id) {
      setTimeout(() => {
        navigate(`../user/${user.id}`);
      }, 1500);
    }
  }, [user.id, navigate]);

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

  return (
    <main className="home">
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
    </main>
  );
}
