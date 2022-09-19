/* User settings controls on User Settings Page */
/* input fields are react-controlled to enable real-time suggestions */

import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequestTools from "../hooks/useRequestTools";

export default function UserSettings() {
  const [createRequest, dispatch, handleApiError, PATH, token] =
    useRequestTools();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  /* User name field and states */
  const [isEditingUsername, toggleEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user.name);
  const usernameField = useRef(null); // focus on input field when editing is toggled
  useLayoutEffect(() => {
    if (isEditingUsername) usernameField.current.focus();
  }, [isEditingUsername]);

  /* Email address field and state */
  const [isEditingEmail, toggleEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const emailField = useRef(null); // focus on input field when editing is toggled
  useLayoutEffect(() => {
    if (isEditingEmail) emailField.current.focus();
  }, [isEditingEmail]);

  /* Password field and state */
  const [isEditingPassword, toggleEditingPassword] = useState(false);
  const currentPasswordField = useRef(null);
  const newPasswordField1 = useRef(null);
  const newPasswordField2 = useRef(null);

  /* Delete user field and state */
  const [isDeletingUser, toggleDeletingUser] = useState(false);
  const deleteUserPassword = useRef(null);

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
      alert("Username successfully changed");
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
      alert("Email address successfully changed");
    } else handleApiError(response);
  }

  async function editPassword(e) {
    e.preventDefault();
    const currentPassword = currentPasswordField.current.value;
    const newPassword1 = newPasswordField1.current.value;
    const newpassword2 = newPasswordField2.current.value;
    if (newPassword1 !== newpassword2) {
      alert("New passwords do not match");
    } else {
      const request = createRequest("PATCH", token, {
        email: user.email,
        oldPassword: currentPassword,
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

  async function deleteUser() {
    /* full password check occurs server-side */
    if (deleteUserPassword.current.value !== "") {
      const request = createRequest("DELETE", token);
      const response = await fetch(`${PATH}/users`, request);
      if (response.ok) {
        const token = response.headers.get("X-AUTH-TOKEN");
        dispatch({ type: "user/deleted", payload: {}, token: token });
        alert("User deleted");
        navigate("/");
      } else handleApiError(response);
    } else return;
  }

  async function resetPasswordFields() {
    document.getElementById("current-password").value = "";
    document.getElementById("new-password-1").value = "";
    document.getElementById("new-password-2").value = "";
    toggleEditingPassword(false);
  }

  const usernameSection = isEditingUsername ? (
    <>
      <input
        className="input-left"
        defaultValue={user.name}
        onChange={(e) => setNewUsername(e.target.value)}
        ref={usernameField}
      />
      <button className="btn-confirm" type="button" onClick={editUsername}>
        Save
      </button>
      <button
        className="btn-cancel"
        type="button"
        onClick={() => {
          toggleEditingUsername(false);
          setNewUsername(user.name);
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <p>{user.name}</p>
      <button
        className="btn-edit-field"
        onClick={() => toggleEditingUsername(true)}
      >
        Edit
      </button>
    </>
  );

  const emailAddressSection = isEditingEmail ? (
    <>
      <input
        className="input-left"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        ref={emailField}
      />
      <button className="btn-confirm" type="button" onClick={editEmail}>
        Save
      </button>
      <button
        className="btn-cancel"
        type="button"
        onClick={() => {
          toggleEditingEmail(false);
          setNewEmail(user.email);
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <p>{user.email}</p>
      <button
        className="btn-edit-field"
        onClick={() => toggleEditingEmail(true)}
      >
        Edit
      </button>
    </>
  );

  const passwordSection = isEditingPassword ? (
    <div id="password-input-fields">
      <div className="password-subsection">
        <p className="password-field-label">Current password:</p>
        <input
          id="current-password"
          className="input-right"
          ref={currentPasswordField}
        />
      </div>
      <div className="password-subsection">
        <p>Enter new password:</p>
        <input
          id="new-password-1"
          className="input-right"
          ref={newPasswordField1}
        />
      </div>
      <div className="password-subsection">
        <p>Re-enter new password:</p>
        <input
          id="new-password-2"
          className="input-right"
          ref={newPasswordField2}
        />
      </div>

      <button className="btn-confirm left" onClick={editPassword}>
        Save
      </button>
      <button
        className="btn-cancel right"
        onClick={() => resetPasswordFields()}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="btn-change-password center"
      onClick={() => toggleEditingPassword(true)}
    >
      Change Password
    </button>
  );

  const deleteUserSection = isDeletingUser ? (
    <div className="delete-user-section">
      <p>To delete your account, please enter your password:</p>
      <input ref={deleteUserPassword} />
      <button
        id="btn-confirm-delete-user"
        className="btn-delete"
        onClick={() => deleteUser()}
      >
        Permanently Delete User
      </button>
      <button
        id="btn-cancel-delete-user"
        className="btn-cancel"
        onClick={() => toggleDeletingUser(false)}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      id="btn-delete-user"
      className="btn-delete"
      onClick={() => toggleDeletingUser(true)}
    >
      Delete User
    </button>
  );

  return (
    <div id="user-settings-menu">
      <div id="user-settings-grid">
        <h3>User Name</h3>
        {usernameSection}
        <h3>Email Address</h3>
        {emailAddressSection}
        <h3>Password</h3>
      </div>
      {passwordSection}
      <br />
      {deleteUserSection}
    </div>
  );
}
