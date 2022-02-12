import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/Stages.css";
import { apiDomain as URL } from "../utils/apiDomain";
import Task from "./Task";
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

  async function handleEditStageName(id) {
    const request = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "title has been edited",
      }),
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages/${id}`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({ type: "stage/updated", payload: { stage: result } });
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
      <div className="stage-header clearfix m-2">
        <h3 className="stage-title">{stage.title}</h3>
        <button
          className="btn-stage-settings"
          class="float-right"
          onClick={() => handleEditStageName(id)}
        >
          ⚙️
        </button>
        <button
          className="btn-stage-delete"
          onClick={() => handleDeleteStage(id)}
          class="float-right"
        >
          X
        </button>
        <div class="clearfix"></div>
        <TaskCreator
          projectId={projectId}
          stageId={stage.id}
          stageIndex={stageIndex}
        />
      </div>
      {taskList}
    </section>
  );
}
