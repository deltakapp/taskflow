/* Redirects from taskflow.tech/user/userId */
/* to taskflow.tech/user/userId/projects */
import { Navigate } from "react-router-dom";

export default function Redirect() {
  return <Navigate to="projects" replace />;
}
