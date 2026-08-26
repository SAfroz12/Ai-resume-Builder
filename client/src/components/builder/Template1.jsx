import { useContext } from "react";
import { EducationContext } from "../../context/EducationContext";
import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { SkillsContext } from "../../context/SkillsContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import { ExperienceContext } from "../../context/ExperienceContext";
import { CertificationsContext } from "../../context/CertificationsContext";
import { useSearchParams } from "react-router-dom";
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


    // Normal Preview → Context data
    // AI Preview → AI data
    const personalInfo =
        data?.personalInfo || contextPersonalInfo;

    const educations =
        data?.education || contextEducations;

    const skills =
        data?.skills || contextSkills;

    const projects =
        data?.projects || contextProjects;

    const experience =
        data?.experience || contextExperience;

    const certifications =
        data?.certifications || contextCertifications;

    return (
        <div className="data">
            <div className="header">
                <h2>
                    {personalInfo.fullName || <span className="placeholder">Your Name</span>}
                </h2>


                <div className="contact">
                    <span>✉ {personalInfo.email || <span className="placeholder">email@example.com</span>}</span>
                    <span>📞 {personalInfo.phone || <span className="placeholder">+91 XXXXXXXX</span>}</span>
                    <span>📍 {personalInfo.location || <span className="placeholder">Your Location</span>}</span>
                    <span>🔗 {personalInfo.github || <span className="placeholder">GitHub</span>}</span>
                    <span>🔗 {personalInfo.linkedin || <span className="placeholder">LinkedIn</span>}</span>
                </div>
            </div>

            <div className="section">
                <h2>PROFESSIONAL SUMMARY</h2>

                <p>
                    {personalInfo.summary || (
                        <span className="placeholder">
                            Write a short summary about yourself, your skills and career goals...
                        </span>
                    )}
                </p>
            </div>


            <div className="section">
                <h2>EDUCATION</h2>

                {educations.length === 0 ||
                    educations.every(
                        edu =>
                            !edu.school &&
                            !edu.degree &&
                            !edu.cgpa &&
                            !edu.startDate &&
                            !edu.endDate
                    ) ? (
                    <p className="placeholder">Add your education details</p>
                ) : (
                    educations.map((edu, index) => (
                        <div key={index} className="edu-item">
                            <div className="edu-top">
                                <h3>{edu.school}</h3>
                                <span>
                                    {edu.startDate} - {edu.endDate}
                                </span>
                            </div>

                            <p>{edu.degree}</p>
                            <p>{edu.cgpa}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="section">
                <h2>SKILLS</h2>

                {skills.technical.length === 0 &&
                    skills.soft.length === 0 &&
                    skills.tools.length === 0 ? (
                    <p className="placeholder">Add your skills</p>
                ) : (
                    <>
                        {skills.technical.length > 0 && (
                            <p><strong>Technical:</strong> {skills.technical.map(i => i.label || i).join(", ")}</p>
                        )}
                        {skills.soft.length > 0 && (
                            <p><strong>Soft:</strong> {skills.soft.map(i => i.label || i).join(", ")}</p>
                        )}
                        {skills.tools.length > 0 && (
                            <p><strong>Tools:</strong> {skills.tools.map(i => i.label || i).join(", ")}</p>
                        )}
                    </>
                )}
            </div>

            <div className="section">
                <h2>PROJECTS</h2>

                {projects.length === 0 ? (
                    <div className="project-item placeholder">
                        <h3>Project Title</h3>
                        <p>Live: https://your-live-link.com</p>
                        <p>GitHub: https://github.com/your-repo</p>
                        <p>Tech: React, Node.js</p>
                        <p>
                            Briefly describe what this project does and your contribution...
                        </p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="project-item">

                            <h3>
                                {project.title || <span className="placeholder">Project Title</span>}
                            </h3>

                            {project.liveUrl ? (
                                <p>Live: {project.liveUrl}</p>
                            ) : (
                                <p className="placeholder">Live: https://your-live-link.com</p>
                            )}

                            {project.githubUrl ? (
                                <p>GitHub: {project.githubUrl}</p>
                            ) : (
                                <p className="placeholder">GitHub: https://github.com/your-repo</p>
                            )}

                            {project.techStack && project.techStack.length > 0 ? (
                                <p>
                                    Tech: {project.techStack.map((item) => item.label).join(", ")}
                                </p>
                            ) : (
                                <p className="placeholder">Tech: React, Node.js</p>
                            )}

                            {project.description ? (
                                <p>{project.description}</p>
                            ) : (
                                <p className="placeholder">
                                    Describe your project and what you built...
                                </p>
                            )}

                        </div>
                    ))
                )}
            </div>

            {/* EXPERIENCE (ONLY IF experienced) */}
            {type === "experienced" && (
                <div className="section">
                    <h2>WORK EXPERIENCE</h2>

                    {!experience?.company ? (
                        <p className="placeholder">Add your work experience</p>
                    ) : (
                        <div className="exp-item">
                            <div className="exp-top">
                                <div>
                                    <h3>
                                        {experience.designation || (
                                            <span className="placeholder">Job Role</span>
                                        )}
                                    </h3>
                                    <p>
                                        {experience.company || (
                                            <span className="placeholder">Company Name</span>
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
                                        Describe your responsibilities and achievements...
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            )}
            <div className="section">
                <h2>CERTIFICATIONS</h2>

                {certifications.length === 0 ? (
                    <p className="placeholder">Add your certifications</p>
                ) : (
                    certifications.map((cert, index) => {
                        const certName = cert.name || cert.label || cert.title;

                        return (
                            <p key={cert.id || index}>
                                • {certName || <span className="placeholder">Certification Name</span>}
                            </p>
                        );
                    })
                )}
            </div>


        </div>
    );
};

export default Template1;