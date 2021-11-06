import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiDomain as URL } from "../../utils/apiDomain";

export default function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token, shallowEqual);

  /* Note: this effect currently runs twice: once when LogoutPage loads, then again after
  dispatch removes the token. This is an inconsequential yet annoying problem to solve */
  useEffect(() => {
    (async () => {
      const request = {
        method: "POST",
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log(request);
      const response = await fetch(`${URL}/api/users/logout`, request);
      console.log(response);
    })();
    dispatch({ type: "user/loggedOut" });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [token, navigate, dispatch]);

  return <h2>You have been logged out and will be redirected</h2>;
}
