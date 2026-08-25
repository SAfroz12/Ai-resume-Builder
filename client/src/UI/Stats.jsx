import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "../styles/statsprogress.css";

const StatsProgress = ({ score = 60 }) => {

  const scoreConfig = [
    { limit: 40, color: "red", status: "Bad" },
    { limit: 60, color: "#ffff00", status: "Average" },
    { limit: 80, color: "green", status: "Good" },
    { limit: 100, color: "#11526C", status: "Excellent" }
  ];

  const config = scoreConfig.find(item => score <= item.limit);

  return (
    <div className="stats-container">

      <div className="stats-header">

        <div className="score-section">
          <p className="label">EDITOR SCORE</p>
          <h2 className="score">{score}</h2>
        </div>

        <div className="status-section">
          <p className="label">STATUS</p>
          <h3 className="status">{config.status}</h3>
        </div>

      </div>

      <div className="progress-section">
        <ProgressBar
          completed={score}
          customLabel=" "
          bgColor={config.color}
          height="12px"
        />
      </div>

    </div>
  );
};

export default StatsProgress;