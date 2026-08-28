import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {

  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/homepage");
  };

  return (
    <div className="landing-container">
      <main className="landing-content">

        <div className="landing-badge">
          ✦ AI-Powered Resume Builder
        </div>

        <h1 className="landing-heading">
         ResumeIQ
          <br />
          <span>That Gets Noticed.</span>
        </h1>

        <p className="landing-text">
          Create a professional, ATS-friendly resume in minutes.
          Use AI-powered insights to improve your content, highlight
          your strengths, and present your experience with confidence.
        </p>

        <div className="landing-features">

          <div className="landing-feature">
            <span className="feature-icon">✦</span>
            <span>AI-Powered</span>
          </div>

          <div className="landing-feature">
            <span className="feature-icon">✓</span>
            <span>ATS Optimized</span>
          </div>

          <div className="landing-feature">
            <span className="feature-icon">◈</span>
            <span>Professional Designs</span>
          </div>

        </div>

        <div className="button-group">

          <button
            className="start-btn"
            onClick={handleStart}
          >
            Start Building
            <span className="button-arrow">→</span>
          </button>

        </div>

        <p className="landing-note">
          Build smarter. Present better. Get closer to your next opportunity.
        </p>

      </main>

    </div>
  );
}

export default LandingPage;