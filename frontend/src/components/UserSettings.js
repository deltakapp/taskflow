/* User settings controls on User Settings Page */

import { useState } from "react";
import { useSelector } from "react-redux";
import useRequestTools from "../hooks/useRequestTools";

export default function UserSettings() {
  const user = useSelector((state) => state.user);
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();

  const [isEditingUsername, toggleEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user.name);
  const [isEditingEmail, toggleEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [isEditingPassword, toggleEditingPassword] = useState(false);

  async function editUsername(e) {
    e.preventDefault();
    const request = createRequest("PATCH", token, {
      name: newUsername,
    });
    const response = await fetch(`${PATH}/users/`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      toggleEditingUsername(false);
      dispatch({ type: "user/patched", payload: result, token: token });
      alert("Password successfully changed");
    } else handleApiError(response);
  }

  async function editEmail(e) {
    e.preventDefault();
    const request = createRequest("PATCH", token, {
      email: newEmail,
    });
    const response = await fetch(`${PATH}/users/`, request);
    if (response.ok) {
      const token = response.headers.get("X-Auth-Token");
      const result = await response.json();
      toggleEditingEmail(false);
      dispatch({ type: "user/patched", payload: result, token: token });
      alert("Password successfully changed");
    } else handleApiError(response);
  }

  async function editPassword(e) {
    e.preventDefault();
    const oldPassword = document.getElementById("current-password").value;
    const newPassword1 = document.getElementById("new-password-1").value;
    const newpassword2 = document.getElementById("new-password-2").value;
    if (newPassword1 !== newpassword2) {
      alert("New passwords do not match");
    } else {
      const request = createRequest("PATCH", token, {
        email: user.email,
        oldPassword: oldPassword,
        newPassword: newPassword1,
      });
      const response = await fetch(`${PATH}/users`, request);
      if (response.ok) {
        const token = response.headers.get("X-Auth-Token");
        toggleEditingPassword(false);
        dispatch({ type: "user/patched", payload: {}, token: token });
        alert("Password successfully changed");
      } else handleApiError(response);
    }
  }

  async function resetPasswordFields() {
    document.getElementById("current-password").value = "";
    document.getElementById("new-password-1").value = "";
    document.getElementById("new-password-2").value = "";
    toggleEditingPassword(false);
  }

  return (
    <>
      <h2>User Name:</h2>
      {isEditingUsername ? (
        <form onSubmit={editUsername}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button type="submit" onClick={editUsername}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              toggleEditingUsername(false);
              setNewUsername(user.name);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{user.name}</p>
          <button onClick={() => toggleEditingUsername(true)}>Edit</button>
        </>
      )}
      <h2>Email Address:</h2>
      {isEditingEmail ? (
        <form onSubmit={editEmail}>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button type="submit" onClick={editEmail}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              toggleEditingEmail(false);
              setNewEmail(user.email);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{user.email}</p>
          <button onClick={() => toggleEditingEmail(true)}>Edit</button>
        </>
      )}

      <h2>Password</h2>
      {isEditingPassword ? (
        <form onSubmit={editPassword}>
          <p>Current password:</p>
          <input id="current-password" type="text" />

          <p>Enter new password:</p>
          <input id="new-password-1" type="text" />

          <p>Re-enter new password:</p>
          <input id="new-password-2" type="text" />

          <button type="submit" onClick={editPassword}>
            Save
          </button>
          <button type="button" onClick={() => resetPasswordFields()}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => toggleEditingPassword(true)}>
          Change Password
        </button>
      )}
    </>
  );
}
