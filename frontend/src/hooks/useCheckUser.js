import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useCheckUser() {
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);
}
