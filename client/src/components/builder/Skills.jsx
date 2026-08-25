import "../../styles/skills.css";
import { Lightbulb } from "lucide-react";
import CreatableSelect from "react-select/creatable";
import { useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext";

function Skills() {

  const { skills, setSkills } = useContext(SkillsContext);

 const updateSkills = (type, value) => {
  const formatted = (value || []).map(item => ({
    label: item.label || item.value,
    value: item.value || item.label
  }));

  setSkills(prev => ({
    ...prev,
    [type]: formatted
  }));
};
  return (
    <div className="skills-container">

      <div className="skills-header">
        <div className="skills-title">
          <Lightbulb size={18} />
          <h2>SKILLS</h2>
        </div>
      </div>

      <div className="skills-group">
        <label>TECHNICAL SKILLS ({skills.technical.length})</label>
        <CreatableSelect
          isMulti
          value={skills.technical||[]}
          onChange={(selected) => updateSkills("technical", selected)}
        />
      </div>

      <div className="skills-group">
        <label>SOFT SKILLS ({skills.soft.length})</label>
        <CreatableSelect
          isMulti
          value={skills.soft||[]}
          onChange={(selected) => updateSkills("soft", selected)}
        />
      </div>

      <div className="skills-group">
        <label>TOOLS & TECHNOLOGIES ({skills.tools.length})</label>
        <CreatableSelect
          isMulti
          value={skills.tools||[]}
          onChange={(selected) => updateSkills("tools", selected)}
        />
      </div>

    </div>
  );
}

export default Skills;