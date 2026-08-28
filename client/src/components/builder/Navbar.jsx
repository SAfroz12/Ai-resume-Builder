import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { EducationContext } from "../../context/EducationContext";
import { SkillsContext } from "../../context/SkillsContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import { ExperienceContext } from "../../context/ExperienceContext";
import { CertificationsContext } from "../../context/CertificationsContext";
import { AiPreviewContext } from "../../context/AiPreviewContext";

import "../../styles/navbar.css";
import ResumeUpload from "./ResumeUpload";

function Navbar() {
  const navigate = useNavigate();

  // reset
  const { resetPersonalInfo } = useContext(PersonalInfoContext);
  const { resetEducation } = useContext(EducationContext);
  const { resetSkills } = useContext(SkillsContext);
  const { resetProjects } = useContext(ProjectsContext);
  const { resetExperience } = useContext(ExperienceContext);
  const { resetCertifications } = useContext(CertificationsContext);
  const { resetAiPreview } = useContext(AiPreviewContext);

  const handleReset = () => {
    resetPersonalInfo();
    resetEducation();
    resetSkills();
    resetProjects();
    resetExperience();
    resetCertifications();
    resetAiPreview();
  };

  return (
    <nav className="navbar">

      <button
        className="logo"
        onClick={() => navigate("/")}
        type="button"
      >
        <span className="logo-mark">✦</span>
        <span className="logo-text">Resume<span>IQ</span></span>
      </button>

      <div className="nav-actions">

        <ResumeUpload />

        <button
          className="reset-btn"
          onClick={handleReset}
          type="button"
        >
          <span className="reset-icon">↻</span>
          Reset
        </button>

      </div>

    </nav>
  );
}

export default Navbar;