/* Refreshes auth token or deletes token on logout*/
const initialState = "";

export default function tokenReducer(prevState = initialState, action) {
  if (action.token) {
    return action.token;
  }
  if (action.type === "user/loggedOut") {
    return initialState;
  }
  return prevState;
}
