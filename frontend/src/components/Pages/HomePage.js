/* This is the home page for users. It contains options to log in, */
/* sign up, or preview the app */

import { useEffect, useLayoutEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";
import PreviewInitializer from "../PreviewInitializer";
import SignupForm from "../SignupForm";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  const [activeMode, setActiveMode] = useState(""); // determines which form is active
  /* Note: these states must === element IDs */

  /* Upon login navigate to user page */
  useEffect(() => {
    if (user.id) {
      if (user.flag === "TEMP") navigate(`../preview/${user.id}/projects`);
      else navigate(`../users/${user.id}/projects`);
    }
  }, [user, navigate]);

  /* Scroll to active section after DOM mutation */
  useLayoutEffect(() => {
    if (activeMode) {
      const scrollDestination = document.getElementById(`${activeMode}`);
      scrollDestination.scrollIntoView();
    }
  });

  return (
    <main className="home-page">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <h2 onClick={() => setActiveMode("login-form")}>Login</h2>
      <LoginForm active={activeMode === "login-form" ? true : false} />
      <br />
      <h2 onClick={() => setActiveMode("signup-form")}>Sign Up</h2>
      <SignupForm active={activeMode === "signup-form" ? true : false} />
      <br />
      <h2 onClick={() => setActiveMode("preview-initializer")}>
        Preview the app
      </h2>
      <PreviewInitializer
        active={activeMode === "preview-initializer" ? true : false}
      />
    </main>
  );
}
