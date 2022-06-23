/* This hook ensures any componenets using it are only accessible */
/* while user is signed in */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useCheckUser() {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("../logout");
    }

    // TODO: implement token expiration UI handling
  }, [token, navigate]);
}
