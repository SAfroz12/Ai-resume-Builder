import { useState } from "react";
import "../../styles/projects.css";
import { ChevronDown, FolderPlus, Trash2 } from "lucide-react";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { useContext } from "react";
import { ProjectsContext } from "../../context/ProjectsContext";
function Projects() {

    const { projects, addProject, deleteProject, updateProject } =
        useContext(ProjectsContext);

    const toggleAccordion = (id) => {
        const current = projects.find((p) => p.id === id);

        updateProject(id, "open", !current.open);
    };


    const maxLength = 2000;

    return (
        <div className="projects-container">

            <h2 className="projects-title">PROJECTS</h2>

            {projects.map((project) => (
                <div key={project.id} className="accordion-item">


                    <div className="accordion-header">

                        <div
                            className="accordion-left"
                            onClick={() => toggleAccordion(project.id)}
                        >
                            <ChevronDown size={18} className={project.open ? "rotate" : ""} />
                            <span>{project.title || "Untitled Project"}</span>
                        </div>

                        <Trash2
                            size={18}
                            className="project-delete-icon"
                            onClick={() => deleteProject(project.id)}
                        />

                    </div>


                    {project.open && (
                        <div className="accordion-body">

                            <div className="form-grid">

                                <div className="input-group">
                                    <label>PROJECT TITLE</label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) =>
                                            updateProject(project.id, "title", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-group">
                                    <label>LIVE URL</label>
                                    <input
                                        type="text"
                                        value={project.liveUrl}
                                        onChange={(e) =>
                                            updateProject(project.id, "liveUrl", e.target.value)}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>GITHUB URL</label>
                                    <input
                                        type="text"
                                        value={project.githubUrl}
                                        onChange={(e) =>
                                            updateProject(project.id, "githubUrl", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-group">
                                    <label>TECH STACK</label>


                                    <CreatableSelect
                                        isMulti
                                        placeholder="Type and press Enter..."
                                        value={project.techStack}
                                        onChange={(selected) =>
                                            updateProject(project.id, "techStack", selected)
                                        }
                                    />
                                </div>

                            </div>

                            <div className="description-section">

                                <div className="description-header">
                                    <label>DESCRIPTION</label>
                                    <span>
                                        {project.description.length}/{maxLength}
                                    </span>
                                </div>

                                <textarea
                                    maxLength={maxLength}
                                    value={project.description}
                                    onChange={(e) =>
                                        updateProject(project.id, "description", e.target.value)
                                    }
                                />

                            </div>

                        </div>
                    )}

                </div>
            ))}

            <div className="center">

                <button className="add-project-btn" onClick={addProject}>

                    ADD PROJECT
                </button>
            </div>

        </div>
    );
}

export default Projects;