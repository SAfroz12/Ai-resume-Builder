import { createContext, useEffect, useState } from "react";

export const ExperienceContext = createContext();
const initialExperience = {
  company: "",
  designation: "",
  startDate: "",
  endDate: "",
  current: false,
  description: ""
};
export const ExperienceProvider = ({ children }) => {

  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem("experience");
    return saved ? JSON.parse(saved) : initialExperience;
  });
  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience))
  }, [experience])

  const updateField = (field, value) => {
    setExperience((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const fillDummyExperience = (data) => {
    setExperience(data);
  };
  const resetExperience = () => {
    setExperience(initialExperience);
    localStorage.removeItem("experience");
  };
  return (
    <ExperienceContext.Provider value={{ experience,
     setExperience, 
     updateField,
      fillDummyExperience,
      resetExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
};