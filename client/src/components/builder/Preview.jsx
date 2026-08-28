import { useRef, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
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
  const handleExport = async () => {
    const element = componentRef.current;

    if (!element) {
      alert("Resume preview is not ready.");
      return;
    }

    try {
      console.log("EXPORT STARTED");

      const options = {
        margin: 0,

        filename: "My-Resume.pdf",

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },

        pagebreak: {
          mode: ["css"],
          avoid: [
            ".project-item",
            ".template-two-item",
            ".resume-project",
            ".resume-education-item",
            ".resume-experience-item",
            ".resume-certification-item",
          ],
        },
      };

      await html2pdf()
        .set(options)
        .from(element)
        .save();

      console.log("EXPORT SUCCESS");
    } catch (error) {
      console.error("EXPORT ERROR:", error);

      alert("Failed to export resume.");
    }
  };

  return (
    <div className="preview-inner">
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
          onClick={handleExport}
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
          ) : !aiPreviewData ? (
            <AIPreview
              type={type}
              template={template}
              personalInfo={personalInfo}
              education={educations}
              skills={skills}
              projects={projects}
              experience={experience}
              certifications={certifications}
            />
          ) : (
            <AIResumeTemplate
              type={type}
              template={template}
              data={aiPreviewData}
            />
          )}
        </div>

      </div>

    </div>
  );
}

export default Preview;