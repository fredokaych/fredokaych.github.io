// components/About.jsx
import React from "react";
import fadeInSection from "../hooks/fadeInSection";

const About = () => {
  const sectionRef = fadeInSection();

  return (
    <section id="about" ref={sectionRef} className="fade-in-section" aria-labelledby="about-header">
      <div className="section-header">
        <h2 id="about-header">About Me</h2>
      </div>

      <div className="card">
        <p>
          I’m a Full Stack Developer with a strong foundation in modern web 
          technologies and a passion for building systems that solve real-world 
          problems. I bridge the gap between design and engineering, combining 
          clean code with intuitive user interfaces.
          <br /><br />
          I specialize in building for the web, frontend, backend, or both. 
          My focus is on shipping robust, scalable solutions rather than just 
          chasing trends. If it solves a problem effectively, I’m interested.
        </p>
      </div>
    </section>
  );
};

export default About;