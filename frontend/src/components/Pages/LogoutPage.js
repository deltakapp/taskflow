/* Just a splash screen informing user they have been logged out */
/* Redirects to homepage after timeout */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate]);

  return (
    <main className="home-page">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <br />
      <h2>You have been logged out and will be redirected.</h2>
    </main>
  );
}
