/* This page lets users sign up */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../../hooks/useRequestTools";

export default function PreviewPage() {
  const [createRequest, dispatch, handleApiError, PATH] = useRequestTools();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  /* Upon signup navigate to the user page */
  useEffect(() => {
    if (user.id) {
      navigate(`../user/${user.id}`);
    }
  }, [user.id, navigate]);

  async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("user-name");
    const email = document.getElementById("user-email");
    const password1 = document.getElementById("user-password-1");
    const password2 = document.getElementById("user-password-2");

    if (password1.value !== password2.value) {
      alert("Passwords do not match. Try again.");
      password1.value = "";
      password2.value = "";
      return;
    }

    const request = createRequest("POST", null, {
      name: name.value,
      email: email.value,
      password: password1.value,
    });

    const response = await fetch(`${PATH}/users`, request);
    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: "user/created",
        payload: result.user,
        token: result.token,
      });
      alert(`User created: \nName: ${name.value}\nEmail: ${email.value}`);
    } else handleApiError(response);
  }

  return <></>;
}
