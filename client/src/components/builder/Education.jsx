import { useContext } from "react";
import { EducationContext } from "../../context/EducationContext";
import { GraduationCap, Trash2, Plus } from "lucide-react";
import "../../styles/education.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Education() {
  const {
    educations,
    updateField,
    addEducation,
    deleteEducation
  } = useContext(EducationContext);

  // FIX: safely convert stored dates
  const safeDate = (value) => {
    if (!value) return null;

    if (typeof value === "string" && /^\d{4}-\d{2}$/.test(value)) {
      return new Date(value + "-01");
    }

    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  };

  return (
    <div className="education-container">

      <div className="education-header">
        <GraduationCap size={20} />
        <h2>EDUCATION</h2>
      </div>

      {educations?.map((edu, index) => (
        <div className="education-card" key={index}>

          <Trash2
            size={18}
            className="delete-icon"
            onClick={() => deleteEducation(index)}
          />

          <div className="form-grid">
            
            <div className="input-group">
              <label>SCHOOL</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateField(index, "school", e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>DEGREE / FIELD</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateField(index, "degree", e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>CGPA</label>
              <input
                type="text"
                value={edu.cgpa}
                onChange={(e) => updateField(index, "cgpa", e.target.value)}
              />
            </div>

            {/* START DATE FIXED */}
            <div className="input-group">
              <label>START DATE</label>
              <DatePicker
                selected={safeDate(edu.startDate)}
                onChange={(date) => {
                  const y = date.getFullYear();
                  const m = String(date.getMonth() + 1).padStart(2, "0");
                  updateField(index, "startDate", `${y}-${m}`);
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select Start Month & Year"
              />
            </div>

            {/* END DATE FIXED */}
            <div className="input-group">
              <label>END DATE</label>
              <DatePicker
                selected={safeDate(edu.endDate)}
                onChange={(date) => {
                  const y = date.getFullYear();
                  const m = String(date.getMonth() + 1).padStart(2, "0");
                  updateField(index, "endDate", `${y}-${m}`);
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select End Month & Year"
                maxDate={new Date()}
              />
            </div>

          </div>
        </div>
      ))}

      <div className="add-education" onClick={addEducation}>
        <Plus size={16} />
        ADD EDUCATION
      </div>

    </div>
  );
}

export default Education;