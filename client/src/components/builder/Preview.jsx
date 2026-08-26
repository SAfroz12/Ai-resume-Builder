import { useRef, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../../styles/preview.css";
import { EducationContext } from "../../context/EducationContext";
import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { SkillsContext } from "../../context/SkillsContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import { ExperienceContext } from "../../context/ExperienceContext";
import { CertificationsContext } from "../../context/CertificationsContext";
import { AiPreviewContext } from "../../context/AiPreviewContext";
import AIPreview from "./AIPreview";
import Template from "./Template";
import AIResumeTemplate from "./AIResumeTemplate";
function Preview() {
  const [mode, setMode] = useState("preview");
  const componentRef = useRef(null);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const template = searchParams.get("template");
  const { personalInfo } = useContext(PersonalInfoContext);
  const { educations } = useContext(EducationContext);
  const { skills } = useContext(SkillsContext);
  const { projects } = useContext(ProjectsContext);
  const { experience } = useContext(ExperienceContext);
  const { certifications } = useContext(CertificationsContext);

  const { aiPreviewData } = useContext(AiPreviewContext);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "My Resume",
  });

  const handleAIResult = () => {
    setMode("ai");
  };

  return (
    <div className="previewdata">
      <div className="preview-header">
        <div className="left-buttons">
          <button
            onClick={() => setMode("preview")}
            className={mode === "preview" ? "active" : ""}
          >
            Preview
          </button>
          <button
            onClick={() => setMode("ai")}
            className={mode === "ai" ? "active" : ""}
          >
            AI Preview
          </button>

        </div>

        <button
          className="download-btn"
          onClick={handlePrint}
        >
          Export
        </button>

      </div>


      <div className="preview-content">

        <div
          className="preview-paper"
          ref={componentRef}
        >
             {mode === "preview" ? (

            <Template
              type={type}
              template={template}
            />

          ) : (

            <>
              {!aiPreviewData ? (

                <AIPreview
                  type={type}
                  template={template}
                  personalInfo={personalInfo}
                  education={educations}
                  skills={skills}
                  projects={projects}
                  experience={experience}
                  certifications={certifications}
                  onResult={handleAIResult}
                />

              ) : (               
                <AIResumeTemplate
                  type={type}
                  template={template}
                  data={aiPreviewData}
                />

              )}
            </>

          )}
        

        </div>

      </div>

    </div>
  );
}

export default Preview;