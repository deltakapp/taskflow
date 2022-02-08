import useCheckUser from "../../utils/useCheckUser";
import ProjectsList from "../ProjectsList";

export default function UserPage() {
  useCheckUser();

  return <ProjectsList />;
}
