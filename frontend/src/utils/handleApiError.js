export default async function handleApiError(response) {
  const message =
    (await response.text()) ||
    "Unknown Error. Please try again or contact the site administrator.";
  alert(`Error: ${message}`);
}
