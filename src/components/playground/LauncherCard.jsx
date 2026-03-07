import React from "react";

const LauncherCard = ({ icon, title, description, onClick }) => {
  return (
    <div className="launcher-card" onClick={onClick}>
      <div className="launcher-icon">{icon}</div>
      <div className="launcher-info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <button className="launcher-btn">Play →</button>
    </div>
  );
};

export default LauncherCard;