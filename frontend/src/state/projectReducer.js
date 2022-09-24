/* This reducer handles redux actions affecting state.project */

const initialState = {
  projectId: null,
  title: "",
  stages: [],
};

export default function projectReducer(prevState = initialState, action) {
  let state = { ...prevState }; // mutate new state not prevState
  const payload = action.payload;

  switch (action.type) {
    /***** Project actions *****/
    case "project/reorderStages": {
      state.stages = payload;
      return state;
    }
    /* Move task between stages */
    case "project/moveTask": {
      const { taskId, oldStageId, newStageId, newTaskIndex } = payload;

      /* index and tasks array of old stage */
      const oldStageIndex = state.stages.findIndex(
        (stage) => stage.stageId === oldStageId
      );
      let oldStageTasks = [...state.stages[oldStageIndex].tasks];

      /* index and object of task */
      const taskIndex = oldStageTasks.findIndex(
        (task) => task.taskId === taskId
      );
      const task = oldStageTasks[taskIndex];

      /* Remove task from old stage */
      oldStageTasks = oldStageTasks.filter((task) => {
        return task.taskId !== taskId;
      });

      /* If new stage different than old stage */
      if (oldStageId !== newStageId) {
        /* index and tasks of new stage */
        const newStageIndex = state.stages.findIndex(
          (stage) => stage.stageId === newStageId
        );
        const newStageTasks = [...state.stages[newStageIndex].tasks];

        /* Add task to new stage */
        if (newTaskIndex === -1) {
          newStageTasks.push(task); // push task to end if index == -1
        } else newStageTasks.splice(newTaskIndex, 0, task); // otherwise insert task at index
        state.stages[newStageIndex].tasks = newStageTasks; // update newStage tasks
      } else {
        /* Add task to new stage */
        if (newTaskIndex === -1) {
          oldStageTasks.push(task); // push task to end if index == -1
        } else oldStageTasks.splice(newTaskIndex, 0, task); // otherwise insert task at index
      }
      state.stages[oldStageIndex].tasks = oldStageTasks; // update oldStage tasks
      return state;
    }
    case "project/loaded": {
      state = payload;
      return state;
    }
    case "project/unloaded": {
      return initialState;
    }
    case "project/updated": {
      if (state.projectId === payload.projectId) {
        // if current project updated
        state = payload;
      }
      return state;
    }
    case "project/deleted": {
      // TODO: amend to just payload not payload.project
      if (payload.projectId === state.projectId) {
        return initialState;
      }
      return state;
    }

    /***** Stage actions *****/
    /* Move task within one stage */
    case "stage/reorderTasks": {
      const index = state.stages.findIndex(
        (stage) => stage.stageId === payload.stageId
      );
      state.stages[index].tasks = payload.tasks;
      return state;
    }
    case "stage/created": {
      state.stages = state.stages.concat(payload);
      return state;
    }
    case "stage/updated": {
      const index = state.stages.findIndex(
        (stage) => stage.stageId === payload.stageId
      );
      state.stages[index] = payload;
      return state;
    }
    case "stage/deleted": {
      state.stages = state.stages.filter(
        (stage) => stage.stageId !== payload.stageId
      );
      return state;
    }

    /***** Task actions *****/
    case "task/created": {
      // find stage
      const stage = state.stages.find(
        (stage) => stage.stageId === payload.stageId
      );
      // add new task
      stage.tasks = stage.tasks.concat(payload.task);
      return state;
    }
    case "task/deleted": {
      // find stage
      const stage = state.stages.find(
        (stage) => stage.stageId === payload.stageId
      );
      // delete task
      stage.tasks = stage.tasks.filter(
        (task) => task.taskId !== payload.taskId
      );
      return state;
    }
    case "task/updated": {
      // locate stage
      const stageIndex = state.stages.findIndex(
        (stage) => stage.stageId === payload.stageId
      );
      // locate task
      const taskIndex = state.stages[stageIndex].tasks.findIndex(
        (task) => task.taskId === payload.task.taskId
      );
      state.stages[stageIndex].tasks[taskIndex] = payload.task;
      return state;
    }

    /***** User actions *****/
    case "user/loggedOut": {
      return initialState;
    }

    /***** Default *****/
    default:
      return prevState;
  }
}
