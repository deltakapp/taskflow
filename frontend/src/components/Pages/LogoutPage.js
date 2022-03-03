/* Just a splash screen informing user they have been logged out */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return <h2>You have been logged out and will be redirected</h2>;
}
