import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function StageCreator({ projectId }) {
  const [open, toggleOpen] = useState(false); // toggle creator open or closed
  const [newTitle, setNewTitle] = useState("");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  async function handleCreateStage(e) {
    // TODO: validate stage name
    e.preventDefault();
    const request = createRequest("POST", token, {
      title: newTitle,
      projectId: projectId,
    });
    const response = await fetch(`${URL}/api/stages`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "stage/created",
        payload: result,
        token: token,
      });
      toggleOpen(false);
      setNewTitle(""); // reset new title field
    } else {
      console.error(response);
    }
  }

  // async function handleEditStageName(id) {
  //   const titleField = id.target.querySelector(".rename");
  //   console.log(titleField);
  //   console.log(titleField.value);
  //   const request = createRequest("PATCH", token, {
  //     title: `${titleField.value}`,
  //   });
  //   const response = await fetch(
  //     `${URL}/api/projects/${projectId}/stages/${id}`,
  //     request
  //   );
  //   if (response.ok) {
  //     const result = await response.json();
  //     console.log(result);
  //     dispatch({ type: "stage/updated", payload: { stage: result } });
  //   } else {
  //     console.log(response.status);
  //   }
  // }

  return open ? (
    <div className="overlay">
      <div className="overlay-inner">
        <form onSubmit={handleCreateStage}>
          <label htmlFor="new-stage-title">Create Stage:</label>
          <input
            type="text"
            id="new-stage-title"
            value={newTitle}
            maxLength="29"
            required
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <div className="two-button mt-2">
            <button className="btn-create-stage" type="submit">
              Create Stage
            </button>
            <button
              className="btn-toggle-stage-creator"
              onClick={() => toggleOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <section className="stage create">
      <button className="btn" onClick={() => toggleOpen(true)}>
        Create Stage
      </button>
    </section>
  );
}
