import { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  data: {
    containerName: string;
    imgTag: string;
    dockerRepoURL: string;
    enabled: boolean;
    selectedItem: any;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      containerName: string;
      imgTag: string;
      dockerRepoURL: string;
      enabled: boolean;
      selectedItem: any;
    }>
  >;
  cCWarning: string | null;
  setCCWarning: React.Dispatch<React.SetStateAction<string | null>>;
  updateData: (
    key: keyof ContextType["data"],
    value: string | boolean | any
  ) => void;
}

const contextData = createContext<ContextType | undefined>(undefined);

export const manageData = () => {
  const context = useContext(contextData);
  if (!context) {
    throw new Error("useManageData must be used within a DockerProvider");
  }
  return context;
};

const DockerProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    containerName: "",
    imgTag: "",
    dockerRepoURL: "",
    enabled: false,
    selectedItem: null,
  });
  const [cCWarning, setCCWarning] = useState<string | null>(null);

  const updateData = (
    key: keyof typeof data,
    value: string | boolean | any
  ) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <contextData.Provider
      value={{
        data,
        setData,
        cCWarning,
        setCCWarning,
        updateData,
      }}
    >
      {children}
    </contextData.Provider>
  );
};

export default DockerProvider;
