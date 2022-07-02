/* This page lets users sign up */

//TODO: use createRequest

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { apiDomain as URL } from "../../utils/apiDomain";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useLogin();

  async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("user-name");
    const email = document.getElementById("user-email");
    const password = document.getElementById("user-password");
    const request = {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    };
    console.log(request);
    const response = await fetch(`${URL}/api/users`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "user/created",
        payload: result.user,
        token: result.token,
      });
    } else {
      const result = await response.json();
      console.log(result.message || response);
      dispatch({ type: "user/failedLogin" });
    }
    name.value = "";
    email.value = "";
    password.value = "";
  }

  return !user.id ? (
    <main className="single">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <h1>
        <a href="/">Taskflow.tech</a>
      </h1>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input id="user-name" type="text" placeholder="User Name" />
        <input id="user-email" type="text" placeholder="Email Address" />
        <input id="user-password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <h3>
        <Link to="/">Log In</Link>
      </h3>
    </main>
  ) : (
    <h1>User is logged in</h1>
  );
}
