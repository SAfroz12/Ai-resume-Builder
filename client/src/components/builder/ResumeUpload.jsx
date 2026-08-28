import axios from "axios";
import { useContext, useRef, useState } from "react";
import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { EducationContext } from "../../context/EducationContext";
import { SkillsContext } from "../../context/SkillsContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import { ExperienceContext } from "../../context/ExperienceContext";
import { CertificationsContext } from "../../context/CertificationsContext";
function ResumeUpload() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setPersonalInfo } = useContext(PersonalInfoContext);
  const { setEducations } = useContext(EducationContext);
  const { setSkills } = useContext(SkillsContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setExperience } = useContext(ExperienceContext);
  const { setCertifications } = useContext(CertificationsContext);
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Frontend validation
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    // 5MB allowed
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    console.log("Uploading:", file.name);
    formData.append("resume", file);

    try {
      setLoading(true);

      // 1. Upload PDF
      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/upload-resume`,
        formData
      );

      console.log("PDF upload response:", uploadResponse.data);

      // 2. Extract text
      const extractedText = uploadResponse.data.text;

      console.log("Extracted text:", extractedText);

      // 3. Convert text into structured resume data
      const aiResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/extract`,
        {
          text: extractedText,
          links: uploadResponse.data.links || []
        }
      );

      console.log("Structured resume:", aiResponse.data);

      // 4. Populate contexts
      const resumeData = aiResponse.data;

      const normalizedProjects = (resumeData.projects || []).map((project, index) => ({
        ...project,

        id: project.id || String(index + 1),

        techStack: (project.techStack || []).map((tech) => {
          if (typeof tech === "string") {
            return {
              label: tech,
              value: tech
            };
          }

          return {
            label: tech.label || tech.value || "",
            value: tech.value || tech.label || ""
          };
        })
      }));

      setPersonalInfo(resumeData.personalInfo || {});
      setEducations(resumeData.education || []);
      setSkills(resumeData.skills || {});
      setProjects(normalizedProjects);
      setExperience(resumeData.experience || {});
      setCertifications(resumeData.certifications || []);

    } catch (error) {

      console.error("Resume processing error:", error);

      console.error(
        "Backend message:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        "Failed to process resume"
      );

    } finally {
      setLoading(false);
      e.target.value = "";
    }

  }

  return (
    <>
      <button
        className="upload-resume-btn"
        onClick={handleClick}
        disabled={loading}
      >
        <span className="upload-icon">↑</span>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {error && (
        <p>{error}</p>
      )}
    </>
  );
}

export default ResumeUpload;