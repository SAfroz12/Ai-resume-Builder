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

      <main className="home-container">

        <div className="home-header">

          <div className="home-brand">
            <span className="brand-star">✦</span>
            ResumeIQ
          </div>

          <h1 className="home-title">
             Choose your resume type and a professional template
          </h1>

       

        </div>


        <section className="selection-section">

          <div className="section-heading">

            <span className="section-number">
              01
            </span>

            <div>
              <h2>Choose Resume Type</h2>

              <p>
                Select the option that best matches your experience.
              </p>
            </div>

          </div>


          <div className="cards">


            <div
              className={`card ${
                resumeType === "fresher" ? "selected" : ""
              }`}
              onClick={() => setResumeType("fresher")}
            >

              {resumeType === "fresher" && (
                <span className="selection-check">
                  ✓
                </span>
              )}

              <div className="icon">
                🎓
              </div>

              <div className="card-content">

                <h3>
                  Fresher
                </h3>

                <p>
                  For students, graduates and entry-level candidates.
                </p>

              </div>

            </div>

            <div
              className={`card ${
                resumeType === "experienced" ? "selected" : ""
              }`}
              onClick={() => setResumeType("experienced")}
            >

              {resumeType === "experienced" && (
                <span className="selection-check">
                  ✓
                </span>
              )}

              <div className="icon">
                💼
              </div>

              <div className="card-content">

                <h3>
                  Experienced
                </h3>

                <p>
                  For professionals with previous work experience.
                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="selection-section template-section">

          <div className="section-heading">

            <span className="section-number">
              02
            </span>

            <div>
              <h2>Choose Your Template</h2>

              <p>
                Pick a design that matches your professional style.
              </p>
            </div>

          </div>


          <div className="template-cards">


            <div
              className={`template-card ${
                template === "template1" ? "selected" : ""
              }`}
              onClick={() => setTemplate("template1")}
            >

              {template === "template1" && (
                <span className="selection-check">
                  ✓
                </span>
              )}

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

              <div className="template-info">

                <h3>
                  Template 1
                </h3>

                <p>
                  Classic Single Column
                </p>

              </div>

            </div>


            <div
              className={`template-card ${
                template === "template2" ? "selected" : ""
              }`}
              onClick={() => setTemplate("template2")}
            >

              {template === "template2" && (
                <span className="selection-check">
                  ✓
                </span>
              )}

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


              <div className="template-info">

                <h3>
                  Template 2
                </h3>

                <p>
                  Modern Two Column
                </p>

              </div>

            </div>

          </div>

        </section>

        <div className="home-action">

          <button
            className="start-building-btn"
            disabled={!resumeType || !template}
            onClick={handleStartBuilding}
          >
            Start Building

            <span>
              →
            </span>

          </button>

          <p className="home-footer">
            Your choices can be changed later while building your resume.
          </p>

        </div>

      </main>

    </div>
  );
}

export default HomePage;