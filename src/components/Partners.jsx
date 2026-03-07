//components/Partners.jsx
import React from "react";
import glory from "../assets/logos/glory.jpg";
import iebc from "../assets/logos/iebc.png";
import jkuat from "../assets/logos/jkuat.png";
import malili from "../assets/logos/malili.jpg";
import medruok from "../assets/logos/medruok.png";
import plan from "../assets/logos/plan.png";
import robisearch from "../assets/logos/robisearch.jpg";
import stkevin from "../assets/logos/stkevin.jpg";
import un from "../assets/logos/un.jpg";
import wmi from "../assets/logos/wmi.png";

const Partners = () => {
    // Step 1: Define your partners once
    const partners = [
        {
            logo: glory,
            alt: "Glory Missionary Girls Centre",
            info: "Developed a results management system and handled IT operations.",
            url: "https://www.facebook.com/glorygirlssuna/"
        },
        {
            logo: jkuat,
            alt: "JKUAT",
            info: "Assisted in IT projects and supported digital learning initiatives.",
            url: "https://www.jkuat.ac.ke/"
        },
        {
            logo: un,
            alt: "United Nations",
            info: "Volunteered online for the 2024 global international volunteers day.",
            url: "https://www.unv.org/"
        },
        {
            logo: stkevin,
            alt: "St. Kevin Hill Schools",
            info: "Implemented cybersecurity measures and managed digital learning tools.",
            url: "https://web.facebook.com/nyalielitehighschool"
        },
        {
            logo: plan,
            alt: "Plan International",
            info: "Conducted research on informal community groups across Migori County.",
            url: "https://plan-international.org/"
        },
        {
            logo: malili,
            alt: "Malili Distributors",
            info: "Led EABL products distribution, reporting and optimized inventory through DMS.",
            url: "https://www.linkedin.com/company/malili-distributors-limited/"
        },
        {
            logo: wmi,
            alt: "WMI",
            info: "Developed and managed scholar website, portal and digital media communications.",
            url: "https://www.wellsmountaininitiative.org/"
        },
        {
            logo: medruok,
            alt: "Medruok",
            info: "Built community agriculture initiatives and managed member programs.",
            url: "#"
        },
        {
            logo: iebc,
            alt: "IEBC",
            info: "Served as Presiding Officer, tech support, and voter registration using KIEMS kits.",
            url: "https://www.iebc.or.ke/"
        },
        {
            logo: robisearch,
            alt: "Robisearch",
            info: "Consulted on multiple software development projects, providing technical guidance.",
            url: "https://robisearch.com/"
        }
    ];

    return (
        <section className="partners">
            <h2>Organizations I’ve Worked With</h2>

            <div className="logo-slider">
                {/* Step 2: Render + duplicate automatically */}
                <div className="logo-track">
                    {[...partners, ...partners].map((p, index) => (
                        <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logo-container"
                            key={index}
                        >
                            <img src={p.logo} alt={p.alt} />
                            <div className="logo-info">
                                <p>{p.info}</p>
                                <span className="visit-link">Visit Website →</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;