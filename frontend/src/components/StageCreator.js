import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";

export default function StageCreator({ projectId }) {
  const [open, toggleOpen] = useState(false);
  //const toggleOpen = useState(false);
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  async function handleCreateStage(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${document.getElementById("new-stage-title").value}`,
      }),
    };
    const response = await fetch(
      `${URL}/api/projects/${projectId}/stages`,
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({ type: "stage/created", payload: result });
      toggleOpen(false);
    } else {
      console.log(response);
    }
  }

  async function handleEditStageName(id) {
    const titleField = id.target.querySelector(".rename");
    console.log(titleField)
    console.log(titleField.value)
    const request = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${titleField.value}`,
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

  return open ? (
    <div class="overlay">
      <div class="overlay-inner">
        <form onSubmit={handleCreateStage}>
          <label for="new-stage-title">Create Stage:</label>
          <input type="text" id="new-stage-title" maxLength="30"></input>
          <div className="two-button mt-2">
            <button className="btn-create-stage" type="submit">
              Create Stage
            </button>
            <button className="btn-toggle-stage-creator" onClick={() => toggleOpen(false)} >
              Cancel
            </button>
	  </div>
        </form>
      </div>
    </div>
  ) : (
    <section className="stage create">
      <button className="btn" onClick={() => toggleOpen(true)} >
        Create Satge
      </button>
    </section>
  );
}
