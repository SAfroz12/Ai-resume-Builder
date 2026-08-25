import StatsProgress from "../UI/Stats";
import { useSearchParams } from "react-router-dom";
import PersonalInfo from "../components/builder/personalInfo";
import Education from "../components/builder/Education";
import WorkExperience from "../components/builder/WorkExperience";
import Preview from "../components/builder/Preview"
import "../styles/builder.css"
import Projects from "../components/builder/Projects";
import Skills from "../components/builder/Skills";
import Certifications from "../components/builder/Certifications";
import { calculateScore } from "../utils/calculateScore";
import { PersonalInfoContext } from "../context/PersonalInfoContext";
import { EducationContext } from "../context/EducationContext";
import { SkillsContext } from "../context/SkillsContext";
import { ProjectsContext } from "../context/ProjectsContext";
import { CertificationsContext } from "../context/CertificationsContext";
import { useContext } from "react";
import Navbar from "../components/builder/Navbar";
import "../styles/builder-theme.css"

function BuilderPage() {


  const { personalInfo } = useContext(PersonalInfoContext);
  const { educations } = useContext(EducationContext);
  const { skills } = useContext(SkillsContext);
  const { projects } = useContext(ProjectsContext);
  const { certifications } = useContext(CertificationsContext);

  const score = calculateScore({
    personalInfo,
    educations,
    skills,
    projects,
    certifications
  });
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  return (
    <>

      <div className="builder-theme">

        <Navbar />
        <div className="fullData">

          <div className="builder">

            <StatsProgress score={score} />
            {/* <h3>Resume Type: {type}</h3> */}
            <PersonalInfo />
            <Education />
            {type === "experienced" && <WorkExperience />}
            <Projects />
            <Skills />
            <Certifications />

          </div>

          <div className="previewdata">

            <Preview />

          </div>
        </div>
      </div>
    </>
  );
}

export default BuilderPage;