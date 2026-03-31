// components/About.jsx
import fadeInSection from "../hooks/fadeInSection";
import { aboutContent } from "../data/about";

const About = () => {
  const sectionRef = fadeInSection();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="fade-in-section"
      aria-labelledby="about-header"
    >
      <div className="section-header">
        <h2 id="about-header">{aboutContent.heading}</h2>
      </div>

      <div className="card">
        {aboutContent.paragraphs.map((text, i) => (
          <p key={i} style={i > 0 ? { marginTop: "1rem" } : undefined}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
