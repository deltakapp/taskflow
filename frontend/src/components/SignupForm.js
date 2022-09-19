/* This page lets users sign up */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function SignupMenu({ active }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("new-user-name");
    const email = document.getElementById("new-user-email");
    const password1 = document.getElementById("new-user-password-1");
    const password2 = document.getElementById("new-user-password-2");

    /* Check if password fields match */
    if (password1.value !== password2.value) {
      alert("Passwords do not match. Try again.");
      password1.value = "";
      password2.value = "";
      return;
    }

    const request = // request depends on if temp user is signed in
      user.flag === "TEMP"
        ? createRequest("POST", token, {
            name: name.value,
            email: email.value,
            password: password1.value,
            flag: "IMPORT",
          })
        : createRequest("POST", null, {
            name: name.value,
            email: email.value,
            password: password1.value,
          });

    /* Send request and process response */
    const response = await fetch(`${PATH}/users`, request);
    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: "user/created",
        payload: result.user,
        token: result.token,
      });
      alert(
        `User created: \nName: ${result.user.name}\nEmail: ${result.user.email}`
      );
      navigate(`/users/${result.user.id}/projects`);
    } else handleApiError(response);

    name.value = ""; // reset credential fields
    email.value = "";
    password1.value = "";
    password2.value = "";
  }

  return (
    <form
      id="signup-form"
      className={active ? "active" : "inactive"}
      onSubmit={handleSignup}
    >
      <input
        id="new-user-name"
        className="form-input"
        type="text"
        placeholder="User Name"
      />
      <input
        id="new-user-email"
        className="form-input"
        type="text"
        placeholder="Email Address"
      />
      <input
        id="new-user-password-1"
        className="form-input"
        type="password"
        placeholder="Password"
      />
      <input
        id="new-user-password-2"
        className="form-input"
        type="password"
        placeholder="Re-type password"
      />
      <div className="options-block">
        <button type="submit" className="btn-confirm">
          Sign Up
        </button>
      </div>
    </form>
  );
}
