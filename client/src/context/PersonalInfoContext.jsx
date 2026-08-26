import { createContext, useState, useEffect } from "react";

export const PersonalInfoContext = createContext();

const initialPersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  summary: ""
};

export const PersonalInfoProvider = ({ children }) => {

  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem("personalInfo");

    return saved
      ? JSON.parse(saved)
      : initialPersonalInfo;
  });

  useEffect(() => {
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
  }, [personalInfo]);

  const updateField = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetPersonalInfo = () => {
    setPersonalInfo(initialPersonalInfo);
    localStorage.removeItem("personalInfo");
  };

  return (
    <PersonalInfoContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        updateField,
        resetPersonalInfo
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};