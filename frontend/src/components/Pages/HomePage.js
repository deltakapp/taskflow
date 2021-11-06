import { Link } from "react-router-dom";

export default function HomePage() {
  function StartUnsavedProject(e) {
    e.preventDefault();
    window.alert("This feature is unavailable yet.");
    return null;
  }

  return (
    <>
      <main id="home-page">
        <h2>
          <Link to="/signup">Sign Up</Link>
        </h2>
        <h3>or</h3>
        <h2>
          <button onClick={StartUnsavedProject}>Start a new project</button>
        </h2>
      </main>
    </>
  );
}
