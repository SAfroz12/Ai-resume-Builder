import { useContext,useState } from "react";
import { PersonalInfoContext } from "../../context/PersonalInfoContext";
import { User } from "lucide-react";
import "../../styles/personalinfo.css";

function  PersonalInfo() {

  const { personalInfo, updateField } = useContext(PersonalInfoContext);


  const [errors, setErrors] = useState({
    github: "",
    linkedin: ""
  });
  const maxLength = 1500;
const handleGithub = (value) => {
  updateField("github", value);
 

  if (value.trim() !== "" && !value.includes("github.com")) {
    setErrors((prev) => ({
      ...prev,
      github: "Enter a valid GitHub URL",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      github: "",
    }));
  }
};

const handleLinkedin = (value) => {
  updateField("linkedin", value);


  if (value.trim() !== "" && !value.includes("linkedin.com")) {
    setErrors((prev) => ({
      ...prev,
      linkedin: "Enter a valid LinkedIn URL",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      linkedin: "",
    }));
  }
};

  return (
    <div className="personal-container">

      <div className="personal-header">
        <User size={20} />
        <h2>PERSONAL INFO</h2>
      </div>

      <div className="form-grid">

        <div className="input-group">
          <label>FULL NAME</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>EMAIL</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>PHONE</label>
          <input
            type="text"
            value={personalInfo.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>LOCATION</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
<div className="input-group">
  <label>GITHUB</label>
  <input
    type="text"
    value={personalInfo.github}
    onChange={(e) =>{
    

      handleGithub(e.target.value)}
    } 
    className={errors.github ? "input-error" : ""}
  />

  {errors.github && <p className="error">{errors.github}</p>}
</div>

<div className="input-group">
  <label>LINKEDIN</label>
  <input
    type="text"
    value={personalInfo.linkedin}
    onChange={(e) => handleLinkedin(e.target.value)}
    className={errors.linkedin ? "input-error" : ""}
  />

  {errors.linkedin && <p className="error">{errors.linkedin}</p>}
</div>

      </div>

      <div className="summary-section">

        <div className="summary-header">
          <label>PROFESSIONAL SUMMARY</label>
          <span>
            {personalInfo.summary.length}/{maxLength}
          </span>
        </div>

        <textarea
          maxLength={maxLength}
          value={personalInfo.summary}
          onChange={(e) => updateField("summary", e.target.value)}
        />

      </div>

    </div>
  );
}

export default PersonalInfo;