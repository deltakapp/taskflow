import { useState } from "react";
import useRequestTools from "../hooks/useRequestTools";
import "../styles/TaskCreator.css";

export default function StageEditor({ stageId }) {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const [open, toggleOpen] = useState(false); // toggle editor open or closed
  const [newTitle, setNewTitle] = useState("");

  // TODO: implement closeStageEditor

  async function handleEditStageName(e) {
    e.preventDefault();
    const request = createRequest("PATCH", token, {
      title: newTitle,
    });
    const response = await fetch(`${PATH}/stages/${stageId}`, request);
    if (response.ok) {
      toggleOpen(false); // close editor
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      dispatch({ type: "stage/updated", payload: result, token: token });
    } else handleApiError(response);
  }

  return open ? ( // display editor if open == true
    <div className="overlay">
      <div className="overlay-inner">
        <form className="stage-rename" onSubmit={handleEditStageName}>
          <label htmlFor="rename">Rename Stage:</label>
          <input
            type="text"
            className="rename"
            maxLength="30"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="two-button mt-2">
            <button className="btn-stage-rename mr-1" type="submit">
              Rename
            </button>
            <button
              className="btn-close-stage-rename ml-1"
              onClick={() => toggleOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    // display button if open == false
    <button className="btn" onClick={() => toggleOpen(true)}>
      Rename Stage
    </button>
  );
}
