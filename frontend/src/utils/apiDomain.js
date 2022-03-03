/********************* FOR DEVELOPMENT ONLY. *************************/
/* Basically a client-side environmental variable holding URL of API */
/* In production, this can be replaced with a constant */

export const apiDomain =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://taskflow.herokuapp.com";
