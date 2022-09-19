import useRequestTools from "../hooks/useRequestTools";

export default function LoginForm({ active }) {
  const [createRequest, dispatch, handleApiError, PATH] = useRequestTools();

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-user-email");
    const password = document.getElementById("login-user-password");

    const request = createRequest("POST", null, {
      email: email.value,
      password: password.value,
    });

    const response = await fetch(`${PATH}/users/login`, request);
    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: "user/loggedIn",
        payload: result.user,
        token: result.token,
      });
    } else handleApiError(response);

    email.value = ""; // reset credential fields
    password.value = "";
  }

  return (
    <form
      id="login-form"
      className={active ? "active" : "inactive"}
      onSubmit={handleLogin}
    >
      <input id="login-user-email" type="text" placeholder="E-mail" />
      <input id="login-user-password" type="password" placeholder="Password" />
      <button type="submit" className="btn-confirm">
        Log In
      </button>
    </form>
  );
}
