/* This page lets users sign up */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../../utils/apiDomain";

export default function SignupPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

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
        payload: { ...result.user, token: result.token },
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
    <main id="signup-page">
      Sign Up:
      <form onSubmit={handleSignup}>
        <span>User Name: </span>
        <input id="user-name" type="text" />
        <br />
        <span>Email: </span>
        <input id="user-email" type="text" />
        <br />
        <span>Password: </span>
        <input id="user-password" type="text" />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  ) : (
    <h1>User is logged in</h1>
  );
}
