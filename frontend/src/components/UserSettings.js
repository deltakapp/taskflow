import { useSelector } from "react-redux";

export default function UserSettings() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h2>User Name:</h2>
      <p>{user.name}</p>
      <button>Edit</button>
      <h2>Email Address:</h2>
      <p>{user.email}</p>
      <button>Edit</button>

      <h2>Password</h2>
      <button>Reset Password</button>
    </>
  );
}
