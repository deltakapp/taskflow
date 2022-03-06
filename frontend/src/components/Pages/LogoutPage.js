/* Just a splash screen informing user they have been logged out */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <main className="single">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <h1>
        <a href="/">Taskflow.tech</a>
      </h1>
      <h2>You have been logged out and will be redirected.</h2>
    </main>
  );
}
