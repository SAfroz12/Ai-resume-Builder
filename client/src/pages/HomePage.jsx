import "../styles/Homepage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [resumeType, setResumeType] = useState("");
  const [template, setTemplate] = useState("");

  const handleStartBuilding = () => {
    if (!resumeType || !template) {
      return;
    }

    navigate(`/builder?type=${resumeType}&template=${template}`);
  };

  return (
    <div className="homepage-wrapper">

      <div className="home-container">

        <h2 className="home-title">
          Choose Resume Type
        </h2>

        {/* RESUME TYPE */}

        <div className="cards">

          <div
            className={`card ${resumeType === "fresher" ? "selected" : ""}`}
            onClick={() => setResumeType("fresher")}
          >
            <div className="icon">🎓</div>
            <h3>Fresher</h3>
          </div>

          <div
            className={`card ${resumeType === "experienced" ? "selected" : ""}`}
            onClick={() => setResumeType("experienced")}
          >
            <div className="icon">💼</div>
            <h3>Experienced</h3>
          </div>

        </div>

        <h2 className="home-title template-heading">
          Choose Template
        </h2>

        <div className="template-cards">

          <div
            className={`template-card ${
              template === "template1" ? "selected" : ""
            }`}
            onClick={() => setTemplate("template1")}
          >

            <div className="template-preview template-one-preview">

              <div className="mini-header">
                YOUR NAME
              </div>

              <div className="mini-line"></div>

              <div className="mini-section">
                PROFESSIONAL SUMMARY
              </div>

              <div className="mini-text"></div>
              <div className="mini-text short"></div>

              <div className="mini-section">
                EDUCATION
              </div>

              <div className="mini-text"></div>

              <div className="mini-section">
                PROJECTS
              </div>

              <div className="mini-text"></div>
              <div className="mini-text"></div>

            </div>

            <h3>Template 1</h3>
            <p>Classic Single Column</p>

          </div>


          {/* TEMPLATE 2 */}

          <div
            className={`template-card ${
              template === "template2" ? "selected" : ""
            }`}
            onClick={() => setTemplate("template2")}
          >

            <div className="template-preview template-two-preview">

              <div className="mini-header">
                YOUR NAME
              </div>

              <div className="mini-line"></div>

              <div className="mini-columns">

                <div className="mini-left">

                  <div className="mini-section">
                    SKILLS
                  </div>

                  <div className="mini-text"></div>
                  <div className="mini-text"></div>
                  <div className="mini-text short"></div>

                  <div className="mini-section">
                    TOOLS
                  </div>

                  <div className="mini-text"></div>
                  <div className="mini-text short"></div>

                  <div className="mini-section">
                    CERTIFICATIONS
                  </div>

                  <div className="mini-text"></div>

                </div>

                <div className="mini-right">

                  <div className="mini-section">
                    SUMMARY
                  </div>

                  <div className="mini-text"></div>
                  <div className="mini-text"></div>

                  <div className="mini-section">
                    EXPERIENCE
                  </div>

                  <div className="mini-text"></div>
                  <div className="mini-text"></div>
                  <div className="mini-text short"></div>

                  <div className="mini-section">
                    PROJECTS
                  </div>

                  <div className="mini-text"></div>
                  <div className="mini-text"></div>

                </div>

              </div>

            </div>

            <h3>Template 2</h3>
            <p>Modern Two Column</p>

          </div>

        </div>


        {/* START BUTTON */}

        <button
          className="start-building-btn"
          disabled={!resumeType || !template}
          onClick={handleStartBuilding}
        >
          Start Building
        </button>


        <p className="subtitle">
          Build ATS-friendly AI powered resumes with modern templates
          and smart content generation.
        </p>

      </div>

    </div>
  );
}

export default HomePage;