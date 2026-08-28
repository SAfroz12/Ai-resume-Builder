import { useContext } from "react";
import { AiPreviewContext } from "../../context/AiPreviewContext";
import "../../styles/aipreview.css"

function AIPreview({
  type,
  personalInfo,
  education,
  skills,
  projects,
  experience,
  certifications,
  
}) {
  const { aiPreviewData, setAiPreviewData, loadingAI, setLoadingAI } =
    useContext(AiPreviewContext);

  const generateAIResume = async () => {
    console.log("BUTTON CLICKED");

    try {
      setLoadingAI(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ai/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            personalInfo: personalInfo || {},
            education: education || [],

            skills: {
              technical: skills?.technical || [],
              soft: skills?.soft || [],
              tools: skills?.tools || [],
            },

            projects:
              projects?.map((p) => ({
                title: p.title || "",
                description: p.description || "",
                technologies:
                  p.technologies ||
                  p.techStack?.map((t) =>
                    typeof t === "string" ? t : t.label
                  ) ||
                  [],
                liveUrl: p.liveUrl || "",
                githubUrl: p.githubUrl || "",
              })) || [],

            experience: experience || {},

            certifications:
              certifications?.map(
                (c) => c.name || c.label || c.title || c
              ) || [],
          }),
        }
      );

      console.log("STATUS:", response.status);

      const rawText = await response.text();

      console.log("BACKEND RESPONSE:", rawText);

      if (!response.ok) {
        throw new Error(
          `AI request failed: ${response.status} - ${rawText}`
        );
      }

      const raw = JSON.parse(rawText);

      console.log("AI DATA:", raw);

      setAiPreviewData(raw);
    
    } catch (err) {
      console.error("AI ERROR:", err);
      alert(err.message || "AI failed.");
    } finally {
      setLoadingAI(false);
    }
  };
  if (loadingAI) {
    return (
      <div className="ai-start-wrapper">
        <div className="ai-start-container">
          <div className="spinner"></div>

          <h3 className="ai-start-title">
            AI is crafting your resume...
          </h3>
        </div>
      </div>
    );
  }
  if (!aiPreviewData) {
    return (
      <div className="ai-start-wrapper">
        <div className="ai-start-container">

          <h2 className="ai-start-title"> ✨ Let AI Improve Your Resume</h2>
          <p className="ai-start-sub">
            Generate optimized summary, skills & experience tailored to your profile.
          </p>

          <button onClick={generateAIResume} className="ai-btn">
            Generate with AI
          </button>

        </div>
      </div>
    );
  }



  return null
}

export default AIPreview;