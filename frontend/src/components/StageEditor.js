import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TaskCreator.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function StageEditor({ stageId }) {
  const [open, toggleOpen] = useState(false); // toggle editor open or closed
  const [newTitle, setNewTitle] = useState("");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // TODO: implement closeStageEditor

  async function handleEditStageName(e) {
    // TODO: validate stage name
    e.preventDefault();
    const request = createRequest("PATCH", token, {
      title: newTitle,
    });
    const response = await fetch(`${URL}/api/stages/${stageId}`, request);
    if (response.ok) {
      toggleOpen(false); // close editor
      const result = await response.json();
      console.log(result);
      dispatch({ type: "stage/updated", payload: result });
    } else {
      console.log(response.status);
    }
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
