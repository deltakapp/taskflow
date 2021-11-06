import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../utils/apiDomain";

export default function Login() {
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

  return !user.id ? (
    <div>
      Log In:
      <form onSubmit={handleLogin}>
        <span>Email: </span>
        <input id="user-email" type="text" />
        <br />
        <span>Password: </span>
        <input id="user-password" type="text" />
        <button type="submit">Log In</button>
      </form>
    </div>
  ) : (
    <h1>You are logged in and will be redirected</h1>
  );
}
