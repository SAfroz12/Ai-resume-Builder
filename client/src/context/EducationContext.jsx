import { createContext, useEffect, useState } from "react";

export const EducationContext = createContext();
const initialEducation = [
  {
    school: "",
    degree: "",
    cgpa: "",
    startDate: "",
    endDate: ""
  }
];
export const EducationProvider = ({ children }) => {

  // safe Json Parse//
  const safeParse = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (err) {
      console.error("Invalid JSON in:", key, err);
      localStorage.removeItem(key);
      return fallback;
    }
  };

  const [educations, setEducations] = useState(() =>
    safeParse("educations", initialEducation)
  );

  useEffect(() => {
    localStorage.setItem("educations", JSON.stringify(educations));
  }, [educations]);

  const updateField = (index, field, value) => {
    setEducations(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const addEducation = () => {
    setEducations(prev => [
      ...prev,
      { ...initialEducation[0] }
    ]);
  };

  const deleteEducation = (index) => {
    setEducations(prev => prev.filter((_, i) => i !== index));
  };
  const resetEducation = () => {
    setEducations(initialEducation);
    localStorage.removeItem("educations");
  };
  return (
    <EducationContext.Provider
      value={{
        educations,
        setEducations,
        updateField,
        addEducation,
        deleteEducation,
      
        resetEducation
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};