import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "../styles/TaskCreator.css";
import { apiDomain as URL } from "../utils/apiDomain";

export default function TaskCreator({ projectId, stageId, stageIndex }) {
  const [open, toggleOpen] = useState(false);
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

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
    <form className="stage-rename" onSubmit={handleEditStageName}>
      <input type="text" className="rename" maxLength="30" />
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
  ) : (
    <button className="btn" onClick={() => toggleOpen(true)} >
      Rename Stage
    </button>
  );
}
