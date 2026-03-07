import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom"; // Import Link

const ProjectModal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{project.title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="project-modal-body">
          <p className="project-description">{project.description}</p>

          <div className="project-tech-section">
            <h4>Tech Stack</h4>
            <div className="tech-badges">
              {project.stack.split("•").map((tech, i) => (
                <span key={i} className="tech-badge">{tech.trim()}</span>
              ))}
            </div>
          </div>

          <div className="project-actions">
            {project.internal ? (
              // Internal project
              <Link
                to={project.route}
                className="btn btn-primary"
                onClick={onClose}
              >
                View Project →
              </Link>
            ) : (
              <>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit ↗
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    GitHub ↗
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") || document.body
  );
};

export default ProjectModal;