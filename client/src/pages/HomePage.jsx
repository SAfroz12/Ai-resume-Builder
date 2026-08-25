import "../styles/Homepage.css"
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const handleCardClick = (type) => {
    console.log(type);
    navigate(`/builder?type=${type}`);
  };

  return (
    <div className="homepage-wrapper">


      <div className="home-container">

        <h2 className="home-title">Choose Resume Type</h2>

        <div className="cards">

          <div
            className="card"
            onClick={() => handleCardClick("fresher")}
          >
            <div className="icon">🎓</div>
            <h3>Fresher</h3>
          </div>

          <div
            className="card"
            onClick={() => handleCardClick("experienced")}
          >
            <div className="icon">💼</div>
            <h3>Experienced</h3>
          </div>

        </div>

        {/* <h3 className="recent">Recent Resumes</h3> */}
        <p className="subtitle">
          Build ATS-friendly AI powered resumes with modern templates
          and smart content generation.
        </p>

      </div>
    </div>
  );
}

export default HomePage;