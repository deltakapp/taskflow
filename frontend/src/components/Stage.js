import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";
import Task from "./Task";
import StageRename from "./StageRename";
import TaskCreator from "./TaskCreator";

export default function Stage({ id, stageIndex, projectId }) {
  console.log(`Rendering stage ${stageIndex}`);
  const stage = useSelector((state) => state.project.stages[stageIndex]);
  const tasks = useSelector((state) => state.project.stages[stageIndex].tasks);
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleDeleteStage(id) {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${id}`,
      request
    );
    if (response.ok) {
      dispatch({ type: "stage/deleted", payload: { id: id } });
    } else {
      console.log(response.status);
    }
  }

  const taskList = tasks
    ? tasks.map((task, index) => {
        return (
          <Task
            key={task.id}
            taskIndex={index}
            stageIndex={stageIndex}
            stageId={id}
            projectId={projectId}
          />
        );
      })
    : null;

  return (
    <section className="stage" key={id}>
      <div className="stage-header">
        <details className="dropdown">
          <summary className="" role="button">
            <h3 className="stage-title">{stage.title}</h3>
            <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="float-right">
              <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            <TaskCreator
              projectId={projectId}
              stageId={stage.id}
              stageIndex={stageIndex}
            />
          </summary>
          <span className="dropdown-content mt-4" >
            <StageRename
              projectId={projectId}
              stageId={stage.id}
              stageIndex={stageIndex}
            />
            <button className="btn" onClick={() => handleDeleteStage(id)}>
              Delete Stage
            </button>
          </span>
        </details>
      </div>
      {taskList}
    </section>
  );
}
