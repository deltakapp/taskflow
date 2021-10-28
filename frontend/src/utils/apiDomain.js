export const apiDomain =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://taskflow.herokuapp.com";
