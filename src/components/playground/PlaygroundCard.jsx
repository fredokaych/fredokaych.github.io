//components/playground/PlaygroundCard.jsx
import React from "react";

const PlaygroundCard = ({ title, children, className = "" }) => {
  return (
    <div className={`playground-interface ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default PlaygroundCard;