import { Outlet } from "react-router-dom";
import PageHeader from "./PageHeader";

export default function App() {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
}
