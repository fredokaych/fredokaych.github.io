// components/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-cover-card" onClick={onClick}>
      <div className="project-cover-content">
        {/* We can derive an icon from the title or add one to data later */}
        <span className="project-icon">{project.icon || "💡"}</span>
        <h3>{project.title}</h3>
        <p>{project.description.substring(0, 80)}...</p>
      </div>
      <div className="project-cover-footer">
        <span className="view-case-study">View Case Study →</span>
      </div>
    </div>
  );
};

export default ProjectCard;