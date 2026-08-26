import { createContext, useState, useEffect } from "react";

export const SkillsContext = createContext();

const initialSkills = {
  technical: [],
  soft: [],
  tools: []
};

export const SkillsProvider = ({ children }) => {

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skills");

    return saved
      ? JSON.parse(saved)
      : initialSkills;
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const resetSkills = () => {
    setSkills(initialSkills);
    localStorage.removeItem("skills");
  };

  return (
    <SkillsContext.Provider
      value={{
        skills,
        setSkills,
        resetSkills
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};