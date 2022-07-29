/* This page lets users sign up */

import { Link } from "react-router-dom";
import SignupMenu from "../SignupMenu";

export default function SignupPage() {
  return (
    <main className="single">
      <img className="logo" alt="Taskflow.tech" src="/logo.png" />
      <h1>
        <a href="/">Taskflow.tech</a>
      </h1>
      <h2>Sign Up</h2>
      <SignupMenu />
      <h3>
        <Link to="/">Log In</Link>
      </h3>
    </main>
  );
}
