/* Creates API requests */
/* This creates any request for which auth is needed */

export default function createRequest(method, token, json) {
  const request = {
    method: method,
    headers: {
      Authorization: token,
      cache: "no-store",
    },
  };
  if (json) {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(json);
  }
  return request;
}
