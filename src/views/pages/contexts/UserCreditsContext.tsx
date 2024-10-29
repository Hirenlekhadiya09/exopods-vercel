import React, { createContext, useState, ReactNode } from "react";

interface UserCreditsContextType {
  credits: number;
  updateCredits: (credits: number) => void;
  isCreditsLoading: boolean;
  setIsCreditsLoading: (isLoading: boolean) => void;
  txnArray: string[];
  setTxnArray: (txnArray: string[]) => void;
}

const UserCreditsContext = createContext<UserCreditsContextType | undefined>(
  undefined
);

const UserCreditsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [credits, setCredits] = useState<number>(0);
  const [isCreditsLoading, setIsCreditsLoading] = useState(true);
  const [txnArray, setTxnArray] = useState<string[]>([]);

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
  };

  return (
    <UserCreditsContext.Provider
      value={{
        credits,
        updateCredits,
        isCreditsLoading,
        setIsCreditsLoading,
        txnArray,
        setTxnArray,
      }}
    >
      {children}
    </UserCreditsContext.Provider>
  );
};

export default UserCreditsProvider;
export { UserCreditsContext };
