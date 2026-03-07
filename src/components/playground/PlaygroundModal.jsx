import React, { useEffect } from "react";
import ReactDom from "react-dom";

const PlaygroundModal = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // We use React Portal to render modal at the end of DOM body
  return ReactDom.createPortal(
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root") || document.body // Fallback if modal-root doesn't exist
  );
};

export default PlaygroundModal;