/* Entry point for React frontend. This SPA (single page application) */
/* is routed by React-router library. Each <Route /> element renders */
/* its children at the specified path. */

/* React-router elements */
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

/* Components */
import HomePage from "./Pages/HomePage";
import LogoutPage from "./Pages/LogoutPage";
import ProjectPage from "./Pages/ProjectPage";
import UserPage from "./Pages/UserPage";
import ProjectsMenu from "./ProjectsMenu";
import SignupForm from "./SignupForm";
import UserSettingsMenu from "./UserSettingsMenu";

/* Styles */
import "../styles/normalize.scss"; // import normalize.scss first for proper css prioritization

import "../styles/dropdown.scss";
import "../styles/header.scss";
import "../styles/homePage.scss";
import "../styles/index.scss";
import "../styles/projectPage.scss";
import "../styles/projectsMenu.scss";
import "../styles/stage.scss";
import "../styles/tabRow.scss";
import "../styles/task.scss";
import "../styles/taskEditor.scss";
import "../styles/userPage.scss";
import "../styles/userSettingsMenu.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="logout" element={<LogoutPage />} />

          <Route path="users/:userId/" element={<UserPage />}>
            <Route path="projects" element={<ProjectsMenu />} />
            <Route path="settings" element={<UserSettingsMenu />} />
          </Route>

          <Route path="preview/:userId/" element={<UserPage />}>
            <Route path="projects" element={<ProjectsMenu />} />
            <Route path="signup" element={<SignupForm active="true" />} />
          </Route>

          <Route path="projects/:projectId" element={<ProjectPage />} />
          <Route path="preview/project/projectId" element={<ProjectPage />} />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
