import "../styles/Navbar.css";
import { shallowEqual, useSelector } from "react-redux";
//import { shallowEqual, useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";


export default function NavPane(props) {
  const projects = useSelector((state) => state.user.projects, shallowEqual);
//const dispatch = useDispatch();
//const navigate = useNavigate();
//const user = useSelector((state) => state.user, shallowEqual);

/* deprecated??
  async function handleLoadProject(id) {
    const request = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${URL}/api/projects/${id}`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "project/loaded",
        payload: { id: id, stages: result },
      });
      navigate(`../project/${id}`);
    }
  }
*/

  const listProjects = projects
    ? projects.map((id) => {
        return (
          //TODO 1: Change to project.id
	  //TODO 2: make onClick work/better
          //        probably a better way to apply this
          //TODO 3: set class of currently selected project to "current"
          //        this will add green color via css
          //TODO 4: a blank id is generated for the first index?
          <li key={id}>
	    <a href="/" onClick="{() => handleLoadProject(id)}">
              {id}
            </a>
          </li>
        );
      })
    : null;

  return (
    <nav id="navbar">
      <ul className="tabrow">
        <li>Foo Project 1</li>
        <li className="current">Current Project 2</li>
        <li>Baz Project 3</li>
        <li>Fab Project 4</li>
        <li>+ Create New Project</li>
      </ul>
      {projects && <ul className="tabrow">{listProjects}</ul>}
    </nav>
  );
}
