import { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext();
const initialProjects = [];
export const ProjectsProvider = ({ children }) => {

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        liveUrl: "",
        githubUrl: "",
        techStack: [],
        description: ""
      }
    ]);
  };

  const deleteProject = (id) => {
    setProjects((prev) =>
      prev.filter((project) => project.id !== id)
    );
  };

  const updateProject = (id, field, value) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const fillDummyProjects = (data) => {
    setProjects(data);
  };
  const resetProjects = () => {
    setProjects(initialProjects);
    localStorage.removeItem("projects");
  };
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        deleteProject,
        updateProject,
        fillDummyProjects,
        resetProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};