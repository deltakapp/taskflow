import useCheckUser from "../../hooks/useCheckUser";
import ProjectsList from "../ProjectsList";

export default function UserPage() {
  useCheckUser();

  return <ProjectsList />;
}
