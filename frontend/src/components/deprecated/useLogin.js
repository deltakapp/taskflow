import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      setTimeout(() => {
        navigate(`../user/${user.id}`);
      }, 1500);
    }
  }, [user.id, navigate]);
}
