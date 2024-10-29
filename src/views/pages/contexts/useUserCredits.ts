import { useContext } from "react";
import { UserCreditsContext } from "./UserCreditsContext";

const useUserCredits = () => {
  const context = useContext(UserCreditsContext);
  if (context === undefined) {
    throw new Error("useUserCredits must be used within a UserCreditsProvider");
  }
  return context;
};

export default useUserCredits;
