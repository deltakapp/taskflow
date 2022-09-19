import useRequestTools from "../hooks/useRequestTools";

export default function PreviewInitializer({ active }) {
  const [createRequest, dispatch, handleApiError, PATH] = useRequestTools();

  async function initializePreview() {
    const request = createRequest("POST", null, {});
    const response = await fetch(`${PATH}/users/temp/`, request);
    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: "user/created",
        payload: { flag: "TEMP", ...result.user },
        token: result.token,
      });
      alert(
        "A temporary user profile has been created for you. If you wish to save your projects, create an account by clicking on the user tab in the top right corner."
      );
    } else handleApiError(response);
  }

  return (
    <div id="preview-initializer" className={active ? "active" : "inactive"}>
      <p id="preview-details">
        You can try the app without creating an account. Your work will not be
        saved unless you sign up.
      </p>
      <button className="btn-confirm" onClick={initializePreview}>
        Try it out!
      </button>
    </div>
  );
}
