import { useContext } from "react";
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
  //reset//
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
    <>

      <div className="navbar">
        <h1 className="logo" >
          <span onClick={() => navigate("/")}>
            Resume Builder
          </span>
        </h1>

        <div className="nav-actions">


      <ResumeUpload />

          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

    </>

  );
}

export default Navbar;