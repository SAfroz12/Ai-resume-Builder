import { useContext } from "react";
import { ExperienceContext } from "../../context/ExperienceContext";
import { Briefcase } from "lucide-react";
import "../../styles/workexperience.css"

function WorkExperience() {

    const { experience, updateField } = useContext(ExperienceContext);

    return (

        <div className="experience-container">

            <div className="experience-header">
                <Briefcase size={20} />
                <h2>WORK EXPERIENCE</h2>
            </div>

            <div className="form-grid">

                <div className="input-group">
                    <label>COMPANY NAME</label>
                    <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateField("company", e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>DESIGNATION</label>
                    <input
                        type="text"
                        value={experience.designation}
                        onChange={(e) => updateField("designation", e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>START DATE</label>
                    <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateField("startDate", e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>END DATE</label>
                    <input
                        type="month"
                        disabled={experience.current}
                        value={experience.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                    />
                </div>

            </div>

            <div className="checkbox-group">
                <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => updateField("current", e.target.checked)}
                />
                <label>Currently working</label>
            </div>

            <div className="description">
                <label>DESCRIPTION</label>
                <textarea
                    value={experience.description}
                    onChange={(e) => updateField("description", e.target.value)}
                />
            </div>

        </div>

    )

}

export default WorkExperience;