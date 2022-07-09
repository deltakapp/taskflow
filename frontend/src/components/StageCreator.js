import { useState } from "react";
import useRequestTools from "../hooks/useRequestTools";

export default function StageCreator({ projectId }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const [open, toggleOpen] = useState(false); // toggle creator open or closed
  const [newTitle, setNewTitle] = useState("");

  async function handleCreateStage(e) {
    e.preventDefault();
    const request = createRequest("POST", token, {
      title: newTitle,
      projectId: projectId,
    });
    const response = await fetch(`${PATH}/stages`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({
        type: "stage/created",
        payload: result,
        token: token,
      });
      toggleOpen(false);
      setNewTitle(""); // reset new title field
    } else handleApiError(response);
  }

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
