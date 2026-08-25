import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {

  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/homepage");
  };

  return (
    <div className="landing-container">

      <div className="landing-content">

        <h1 className="landing-heading">
          Build a AI Resume That Gets Read
        </h1>

        <p className="landing-text">
          Premium design, AI-powered insights and ATS-optimized layouts
          to help you land your dream job faster.
        </p>

        <button className="start-btn" onClick={handleStart}>
          Start Building 🚀
        </button>

      </div>

    </div>
  );
}

export default LandingPage;