// components/Projects.jsx
import React, { useState } from "react";
import fadeInSection from "../hooks/fadeInSection";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";

// Updated Data: Added Wiga Ward Dashboard
const projects = [

  {
    title: "Wiga Ward – Voter Registration Dashboard",
    icon: "🗳️",
    description:
      "A real-time, cloud-synced dashboard for tracking daily voter registration statistics. Features interactive Chart.js visualizations, CSV import/export, and secure admin authentication via Supabase.",
    stack: "React • Supabase • Chart.js",
    live: "https://fredokaych.github.io/reg-data/",
    github: "https://github.com/fredokaych/reg-data",
  },
  {
    title: "ChamaFlow – Multi-Organization Platform",
    icon: "🏦",
    description:
      "A scalable multi-tenant platform for investment groups. Features secure data isolation via PostgreSQL RLS and mobile-first dashboards for seamless user management.",
    stack: "React • Supabase • PostgreSQL",
    live: "https://chamaflow-sooty.vercel.app/",
  },

  {
    title: "Victor Okuna – Campaign Website",
    icon: "🗳️",
    description:
      "A fully responsive, modern campaign website built in React for Victor Okuna, a candidate for Member of Parliament in Suna East. Features volunteer signup, donation integration, and social links.",
    stack: "React • React Router • UI/UX Design",
    live: "https://fredokaych.github.io/okuna/",
    github: "https://github.com/fredokaych/okuna",
  },
  {
    title: "Tribute to the 57 Lecturers – Class of 2007",
    icon: "🎓",
    description:
      "A digital tribute and yearbook page honoring my classmates from Osingo Mixed Secondary School, Class of 2007. Built in React as a responsive alumni gallery experience.",
    stack: "React • Responsive Grid • Routing",
    internal: true,
    route: "/57-lecturers",
  },
  {
    title: "Pathfinding Algorithm Visualizer",
    icon: "🗺️",
    description:
      "An interactive in-browser visualization engine for graph traversal algorithms. It renders a dynamic grid and animates BFS, DFS, and A* step-by-step.",
    stack: "JavaScript • Algorithms • Canvas API",
    live: "https://fredokaych.github.io/portfolio/projects/pathfinding-visualizer/index.html",
    github: "https://github.com/fredokaych/portfolio/tree/main/projects/pathfinding-visualizer",
  },
  {
    title: "Education Data Dashboard",
    icon: "📊",
    description:
      "A dynamic, interactive dashboard that visualizes school performance data. Supports filters, KPIs, and renders custom charts using the Canvas API.",
    stack: "HTML • CSS • JavaScript • Data Visualization",
    live: "https://fredokaych.github.io/portfolio/projects/data-dashboard/index.html",
    github: "https://github.com/fredokaych/portfolio/tree/main/projects/data-dashboard",
  },
  {
    title: "Offline-First Task Manager",
    icon: "📴",
    description:
      "A progressive web app that functions fully offline. Implements Service Workers for caching and LocalStorage for persistent state.",
    stack: "JavaScript • Service Workers • PWA",
    live: "https://fredokaych.github.io/portfolio/projects/offline-notes/index.html",
    github: "https://github.com/fredokaych/portfolio/tree/main/projects/offline-notes",
  },
];

const Projects = () => {
  const sectionRef = fadeInSection();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="fade-in-section"
      aria-labelledby="projects-header"
    >
      <div className="section-header">
        <h2 id="projects-header">Featured Projects</h2>
        <p>
          A selection of work I’ve designed and engineered. Click to view details.
        </p>
      </div>

      <div className="grid projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;