import { createContext, useState, useContext } from "react";

export const EmailConfirmationToastContext = createContext<{
  confirmationToast: boolean;
  setConfirmationToast: (confirmationToast: boolean) => void;
}>({
  confirmationToast: false,
  setConfirmationToast: () => {},
});

export const EmailConfirmationToastProvider = ({ children }: any) => {
  const [confirmationToast, setConfirmationToast] = useState<boolean>(false);

  return (
    <EmailConfirmationToastContext.Provider
      value={{ confirmationToast, setConfirmationToast }}
    >
      {children}
    </EmailConfirmationToastContext.Provider>
  );
};

export const useEmailConfirmationToast = () => {
  const context = useContext(EmailConfirmationToastContext);
  if (!context) {
    throw new Error(
      "useConfirmationToast must be used within a ConfirmationToastProvider"
    );
  }
  return context;
};
