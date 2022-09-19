export default async function handleApiError(response) {
  let message;

  /* If response is text format */
  if (response.text) {
    message = await response.text();

    /* If response is json format */
  } else if (response.json) {
    message = await response.json();

    /* If response json contains error property (database error) */
    if (message.error) {
      message = response.error;
    }

    /* If response contains no obvious message */
  } else {
    message =
      "Unknown Error. Please try again or contact the site administrator.";
  }

  alert(`Error: ${message}`);
}
