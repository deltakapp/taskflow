import "../styles/Navbar.css";

export default function NavPane(props) {
  return (
    <nav id="navbar">
      <ul class="tabrow">
        <li>Foo Project 1</li>
        <li class="current">Current Project 2</li>
        <li>Baz Project 3</li>
        <li>Fab Project 4</li>
        <li>+ Create New Project</li>
      </ul>
    </nav>
  );
}
