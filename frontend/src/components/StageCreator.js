import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiDomain as URL } from "../utils/apiDomain";

export default function StageCreator({ projectId }) {
  const [open, toggleOpen] = useState(false);
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
    } else {
      console.log(response);
    }
  }

  return (
    <>
      Create Stage:
      <form onSubmit={handleCreateStage}>
        <input id="new-stage-title"></input>
        <button
          className="btn-toggle-stage-creator"
          onClick={() => toggleOpen(false)}
        >
          Cancel
        </button>
        <button className="btn-create-stage" type="submit">
          Create Stage
        </button>
      </form>
    </>
  );
}
