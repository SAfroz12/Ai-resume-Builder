import { useContext } from "react";
import { EducationContext } from "../../context/EducationContext";
import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { SkillsContext } from "../../context/SkillsContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import { ExperienceContext } from "../../context/ExperienceContext";
import { CertificationsContext } from "../../context/CertificationsContext";

import "../../styles/template.css";

const Template1 = ({ type, data }) => {

    const { personalInfo: contextPersonalInfo } =
        useContext(PersonalInfoContext);

    const { educations: contextEducations } =
        useContext(EducationContext);

    const { skills: contextSkills } =
        useContext(SkillsContext);

    const { projects: contextProjects } =
        useContext(ProjectsContext);

    const { experience: contextExperience } =
        useContext(ExperienceContext);

    const { certifications: contextCertifications } =
        useContext(CertificationsContext);



    const personalInfo =
        data?.personalInfo ||
        contextPersonalInfo ||
        {};


    const educations =
        Array.isArray(data?.education)
            ? data.education
            : Array.isArray(contextEducations)
                ? contextEducations
                : [];


    const rawSkills =
        data?.skills ||
        contextSkills ||
        {};


    const skills = {
        technical: Array.isArray(rawSkills.technical)
            ? rawSkills.technical
            : [],

        soft: Array.isArray(rawSkills.soft)
            ? rawSkills.soft
            : [],

        tools: Array.isArray(rawSkills.tools)
            ? rawSkills.tools
            : []
    };


    const projects =
        Array.isArray(data?.projects)
            ? data.projects
            : Array.isArray(contextProjects)
                ? contextProjects
                : [];


    const experience =
        data?.experience ||
        contextExperience ||
        {};


    const certifications =
        Array.isArray(data?.certifications)
            ? data.certifications
            : Array.isArray(contextCertifications)
                ? contextCertifications
                : [];


    return (
        <div className="data">

            {/* HEADER */}

            <div className="header">

                <h2>
                    {personalInfo.fullName || (
                        <span className="placeholder">
                            Your Name
                        </span>
                    )}
                </h2>


                <div className="contact">

                    <span>
                        ✉{" "}
                        {personalInfo.email || (
                            <span className="placeholder">
                                email@example.com
                            </span>
                        )}
                    </span>

                    <span>
                        📞{" "}
                        {personalInfo.phone || (
                            <span className="placeholder">
                                +91 XXXXXXXX
                            </span>
                        )}
                    </span>

                    <span>
                        📍{" "}
                        {personalInfo.location || (
                            <span className="placeholder">
                                Your Location
                            </span>
                        )}
                    </span>

                    <span>
                        🔗{" "}
                        {personalInfo.github || (
                            <span className="placeholder">
                                GitHub
                            </span>
                        )}
                    </span>

                    <span>
                        🔗{" "}
                        {personalInfo.linkedin || (
                            <span className="placeholder">
                                LinkedIn
                            </span>
                        )}
                    </span>

                </div>

            </div>


            {/* SUMMARY */}

            <div className="section">

                <h2>PROFESSIONAL SUMMARY</h2>

                <p>
                    {personalInfo.summary || (
                        <span className="placeholder">
                            Write a short summary about yourself,
                            your skills and career goals...
                        </span>
                    )}
                </p>

            </div>


            {/* EDUCATION */}

            <div className="section">

                <h2>EDUCATION</h2>

                {educations.length === 0 ||
                    educations.every(
                        edu =>
                            !edu?.school &&
                            !edu?.degree &&
                            !edu?.cgpa &&
                            !edu?.startDate &&
                            !edu?.endDate
                    ) ? (

                    <p className="placeholder">
                        Add your education details
                    </p>

                ) : (

                    educations.map((edu, index) => (

                        <div
                            key={edu?.id || index}
                            className="edu-item"
                        >

                            <div className="edu-top">

                                <h3>
                                    {edu?.school || (
                                        <span className="placeholder">
                                            School / College Name
                                        </span>
                                    )}
                                </h3>

                                <span>
                                    {edu?.startDate || "Start"} -{" "}
                                    {edu?.endDate || "End"}
                                </span>

                            </div>

                            <p>
                                {edu?.degree}
                            </p>

                            {edu?.cgpa && (
                                <p>
                                    {edu.cgpa}
                                </p>
                            )}

                        </div>

                    ))

                )}

            </div>


            {/* SKILLS */}

            <div className="section">

                <h2>SKILLS</h2>

                {skills.technical.length === 0 &&
                    skills.soft.length === 0 &&
                    skills.tools.length === 0 ? (

                    <p className="placeholder">
                        Add your skills
                    </p>

                ) : (

                    <>

                        {skills.technical.length > 0 && (

                            <p>
                                <strong>
                                    Technical:
                                </strong>{" "}

                                {skills.technical
                                    .map(item =>
                                        typeof item === "string"
                                            ? item
                                            : item?.label ||
                                            item?.value ||
                                            ""
                                    )
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>

                        )}


                        {skills.soft.length > 0 && (

                            <p>
                                <strong>
                                    Soft:
                                </strong>{" "}

                                {skills.soft
                                    .map(item =>
                                        typeof item === "string"
                                            ? item
                                            : item?.label ||
                                            item?.value ||
                                            ""
                                    )
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>

                        )}


                        {skills.tools.length > 0 && (

                            <p>
                                <strong>
                                    Tools:
                                </strong>{" "}

                                {skills.tools
                                    .map(item =>
                                        typeof item === "string"
                                            ? item
                                            : item?.label ||
                                            item?.value ||
                                            ""
                                    )
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>

                        )}

                    </>

                )}

            </div>


            {/* PROJECTS */}

            <div className="section">

                <h2>PROJECTS</h2>

                {projects.length === 0 ? (

                    <div className="project-item placeholder">

                        <h3>
                            Project Title
                        </h3>

                        <p>
                            Live: https://your-live-link.com
                        </p>

                        <p>
                            GitHub: https://github.com/your-repo
                        </p>

                        <p>
                            Tech: React, Node.js
                        </p>

                        <p>
                            Briefly describe what this project does
                            and your contribution...
                        </p>

                    </div>

                ) : (

                    projects.map((project, index) => {

                        const technologies = Array.isArray(project?.techStack)
                            ? project.techStack
                            : [];

                        return (

                            <div
                                key={project?.id || index}
                                className="project-item"
                            >

                                <h3>
                                    {project?.title || (
                                        <span className="placeholder">
                                            Project Title
                                        </span>
                                    )}
                                </h3>


                                {project?.liveUrl && (
                                    <p>
                                        <strong>Live:</strong>{" "}
                                        {project.liveUrl}
                                    </p>
                                )}

                                {project?.githubUrl && (
                                    <p>
                                        <strong>GitHub:</strong>{" "}
                                        {project.githubUrl}
                                    </p>
                                )}


                                {technologies.length > 0 && (
                                    <div className="project-tech">
                                        <em>Tech: </em>

                                        {technologies.map((tech, techIndex) => {
                                            const techName =
                                                typeof tech === "string"
                                                    ? tech
                                                    : tech?.value || tech?.label || "";

                                            return (
                                                <span key={techIndex}>
                                                    {techName}
                                                    {techIndex < technologies.length - 1 ? ", " : ""}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}

                                {project?.description ? (

                                    <p>
                                        {project.description}
                                    </p>

                                ) : (

                                    <p className="placeholder">
                                        Describe your project and
                                        what you built...
                                    </p>

                                )}

                            </div>

                        );

                    })

                )}

            </div>


            {/* EXPERIENCE */}

            {type === "experienced" && (

                <div className="section">

                    <h2>
                        WORK EXPERIENCE
                    </h2>

                    {!experience?.company ? (

                        <p className="placeholder">
                            Add your work experience
                        </p>

                    ) : (

                        <div className="exp-item">

                            <div className="exp-top">

                                <div>

                                    <h3>
                                        {experience.designation || (
                                            <span className="placeholder">
                                                Job Role
                                            </span>
                                        )}
                                    </h3>

                                    <p>
                                        {experience.company || (
                                            <span className="placeholder">
                                                Company Name
                                            </span>
                                        )}
                                    </p>

                                </div>


                                <div className="exp-right">

                                    <p>
                                        {experience.startDate || "Start"} -{" "}
                                        {experience.endDate || "End"}
                                    </p>

                                </div>

                            </div>


                            <p>
                                {experience.description || (
                                    <span className="placeholder">
                                        Describe your responsibilities
                                        and achievements...
                                    </span>
                                )}
                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* CERTIFICATIONS */}

            <div className="section">

                <h2>
                    CERTIFICATIONS
                </h2>

                {certifications.length === 0 ? (

                    <p className="placeholder">
                        Add your certifications
                    </p>

                ) : (

                    certifications.map((cert, index) => {

                        const certName =
                            typeof cert === "string"
                                ? cert
                                : cert?.name ||
                                cert?.label ||
                                cert?.title;


                        return (

                            <p key={cert?.id || index}>

                                •{" "}

                                {certName || (
                                    <span className="placeholder">
                                        Certification Name
                                    </span>
                                )}

                            </p>

                        );

                    })

                )}

            </div>

        </div>
    );
};

export default Template1;