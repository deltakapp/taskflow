import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../deprecated/TaskList.css";

export default function TaskList({ stageId, stageIndex, projectId }) {
  const tasks = useSelector(
    (state) => state.project.stages[stageIndex].tasks,
    shallowEqual
  ); //revise comparison fn
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleDeleteTask(id) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${stageId}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { id: id } });
    } else {
      console.log(response.status);
    }
  }

  const tasksList = tasks ? (
    tasks.map((task) => {
      return (
        <section className="task" key={task.id}>
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <button className="btn-task-settings">⚙️</button>
            <button
              className="btn-task-delete"
              onClick={() => handleDeleteTask(task.id)}
            >
              ❌
            </button>
          </div>
          {/* <Task /> */}
        </section>
      );
    })
  ) : (
    <li>No tasks yet</li>
  );

  return <div id="task-list">{tasksList}</div>;
}
