import { removeAccessToken } from "./removeAccessToken";
import { supabaseClient } from "config/supabaseClient";
import useAuth from "context/AuthContext/useAuth";
import { useNavigate } from "react-router-dom";

function Logout({ className, children }: LogoutProps) {
  const { session } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error);
    } else {
      navigate("/");
      window.location.reload();
    }
    removeAccessToken();
  }

  return (
    <>
      {session && (
        <button onClick={() => handleLogout()} className={`${className}`}>
          {children && children}
        </button>
      )}
    </>
  );
}

export default Logout;

interface LogoutProps {
  className?: string;
  children?: React.ReactNode | string;
}
