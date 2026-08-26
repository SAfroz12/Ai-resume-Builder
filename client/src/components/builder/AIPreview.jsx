import { useContext } from "react";
import { AiPreviewContext } from "../../context/AiPreviewContext";
import "../../styles/template.css";
import "../../styles/aipreview.css"
function normalize(list) {
  if (!Array.isArray(list)) return [];
  return list.map(item => {
    if (typeof item === "string") return item;
    return item.label || item.name || item.title || JSON.stringify(item);
  });
}

function AIPreview({
  type,
  personalInfo,
  education,
  skills,
  projects,
  experience,
  certifications,
  onResult
}) {
  const { aiPreviewData, setAiPreviewData, loadingAI, setLoadingAI } =
    useContext(AiPreviewContext);

  const generateAIResume = async () => {
    console.log("BUTTON CLICKED");

    try {
      setLoadingAI(true);
      console.log(" Sending request...");
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          personalInfo: personalInfo || {},
          education: education || [],
          skills: {
            technical: skills?.technical || [],
            soft: skills?.soft || [],
            tools: skills?.tools || []
          },
          projects: projects?.map(p => ({
            title: p.title || "",
            description: p.description || "",
            technologies: p.technologies || p.techStack?.map(t => t.label) || []
          })) || [],
          experience: experience || {},
          certifications: certifications?.map(c => c.name || c.label || c.title || c) || []
        })
      });
      const raw = await response.json();

      console.log(" BACKEND DATA:", raw);
      setAiPreviewData(raw);
      onResult(raw);
    } catch (err) {
      console.error("AI ERROR:", err);
      alert("AI failed.");
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
           🚀 Generate optimized summary, skills & experience tailored to your profile.
          </p>

          <button onClick={generateAIResume} className="ai-btn">
            Generate with AI
          </button>

        </div>
      </div>
    );
  }

  const d = aiPreviewData;

  return (
    <div className="data">

 
      <div className="header">
        <h2>{d.personalInfo?.fullName}</h2>

        {d.personalInfo?.role && (
          <p className="role">{d.personalInfo?.role}</p>
        )}

        <div className="contact">
          <span>✉ {d.personalInfo?.email}</span>
          <span>📞 {d.personalInfo?.phone}</span>
          <span>📍 {d.personalInfo?.location}</span>
          <span>🔗 {d.personalInfo?.github}</span>
          <span>🔗 {d.personalInfo?.linkedin}</span>
        </div>
      </div>

    
      <div className="section">
        <h2>PROFESSIONAL SUMMARY</h2>
        <p>{d.personalInfo?.summary}</p>
      </div>

      <div className="section">
        <h2>EDUCATION</h2>

        {d.education?.map((edu, i) => (
          <div key={i} className="edu-item">
            <div className="edu-top">
              <h3>{edu.school || edu.university}</h3>
              <span>{edu.startDate} - {edu.endDate}</span>
            </div>

            <p>{edu.degree}</p>
            {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
          </div>
        ))}
      </div>

      <div className="section">
        <h2>SKILLS</h2>

        <p><strong>Technical:</strong>
          {normalize(d.skills?.technical)?.join(", ")}
        </p>

        <p><strong>Soft:</strong>
          {normalize(d.skills?.soft)?.join(", ")}
        </p>

        <p><strong>Tools:</strong>
          {normalize(d.skills?.tools)?.join(", ")}
        </p>
      </div>

      <div className="section">
        <h2>PROJECTS</h2>

        {d.projects?.map((p, i) => (
          <div key={i} className="project-item">
            <h3>{p.title}</h3>

            {p.liveUrl && <p>Live: {p.liveUrl}</p>}
            {p.githubUrl && <p>GitHub: {p.githubUrl}</p>}

            <p>Tech: {normalize(p.technologies)?.join(", ")}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>


      {/* HIDE ENTIRE EXPERIENCE SECTION IF EMPTY */}
      {type !== "fresher" && d.experience && Object.keys(d.experience).length > 0 && (
        <div className="section">
          <h2>WORK EXPERIENCE</h2>

          {Array.isArray(d.experience) ? (
            d.experience.map((exp, i) => (
              <div key={i} className="exp-item">
                <div className="exp-top">
                  <div>
                    <h3>{exp.title || exp.designation}</h3>
                    <p>{exp.company}</p>
                  </div>
                  <div className="exp-right">
                    <p>{exp.startDate} - {exp.endDate || "Present"}</p>
                  </div>
                </div>

                <p>{exp.description}</p>

                {exp.responsibilities && (
                  <ul>
                    {normalize(exp.responsibilities).map((r, i2) => (
                      <li key={i2}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div className="exp-item">
              <div className="exp-top">
                <div>
                  <h3>{d.experience.designation}</h3>
                  <p>{d.experience.company}</p>
                </div>
                <div className="exp-right">
                  <p>{d.experience.startDate} - {d.experience.endDate || "Present"}</p>
                </div>
              </div>

              <p>{d.experience.description}</p>

              {d.experience.responsibilities && (
                <ul>
                  {normalize(d.experience.responsibilities).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
      <div className="section">
        <h2>CERTIFICATIONS</h2>
        {normalize(d.certifications)?.map((c, i) => (
          <p key={i}>• {c}</p>
        ))}
      </div>
    </div>
  );
}

export default AIPreview;