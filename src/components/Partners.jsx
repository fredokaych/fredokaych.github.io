//components/Partners.jsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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

const partners = [
    { logo: glory,     alt: "Glory Missionary Girls Centre", info: "Developed a results management system and handled IT operations.",                    url: "https://www.facebook.com/glorygirlssuna/" },
    { logo: jkuat,     alt: "JKUAT",                         info: "Assisted in IT projects and supported digital learning initiatives.",                  url: "https://www.jkuat.ac.ke/" },
    { logo: un,        alt: "United Nations",                 info: "Volunteered online for the 2024 global international volunteers day.",                  url: "https://www.unv.org/" },
    { logo: stkevin,   alt: "St. Kevin Hill Schools",         info: "Implemented cybersecurity measures and managed digital learning tools.",                url: "https://web.facebook.com/nyalielitehighschool" },
    { logo: plan,      alt: "Plan International",             info: "Conducted research on informal community groups across Migori County.",                 url: "https://plan-international.org/" },
    { logo: malili,    alt: "Malili Distributors",            info: "Led EABL products distribution, reporting and optimized inventory through DMS.",        url: "https://www.linkedin.com/company/malili-distributors-limited/" },
    { logo: wmi,       alt: "WMI",                            info: "Developed and managed scholar website, portal and digital media communications.",       url: "https://www.wellsmountaininitiative.org/" },
    { logo: medruok,   alt: "Medruok",                        info: "Built community agriculture initiatives and managed member programs.",                   url: "#" },
    { logo: iebc,      alt: "IEBC",                           info: "Served as Presiding Officer, tech support, and voter registration using KIEMS kits.",   url: "https://www.iebc.or.ke/" },
    { logo: robisearch,alt: "Robisearch",                     info: "Consulted on multiple software development projects, providing technical guidance.",     url: "https://robisearch.com/" },
];

// Portal tooltip — rendered directly into document.body to escape overflow:hidden
function TooltipPortal({ tooltip }) {
    if (!tooltip) return null;
    const { info, url, rect } = tooltip;

    const TOOLTIP_W = 230;
    const TOOLTIP_H = 80; // approx
    const GAP = 10;

    // Position above the hovered logo, centred
    let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
    let top = rect.top + window.scrollY - TOOLTIP_H - GAP;

    // Keep within viewport horizontally
    if (left < 8) left = 8;
    if (left + TOOLTIP_W > window.innerWidth - 8) left = window.innerWidth - TOOLTIP_W - 8;

    return createPortal(
        <div
            className="logo-tooltip-portal"
            style={{ left, top, width: TOOLTIP_W }}
        >
            <p>{info}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="visit-link">
                Visit Website →
            </a>
        </div>,
        document.body
    );
}

const Partners = () => {
    const [tooltip, setTooltip] = useState(null);
    const hideTimer = useRef(null);

    const showTooltip = useCallback((e, partner) => {
        clearTimeout(hideTimer.current);
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({ info: partner.info, url: partner.url, rect });
    }, []);

    const hideTooltip = useCallback(() => {
        hideTimer.current = setTimeout(() => setTooltip(null), 120);
    }, []);

    // Recalculate position on scroll so the tooltip tracks correctly
    useEffect(() => {
        const onScroll = () => setTooltip(null);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="partners">
            <h2>Organizations I've Worked With</h2>

            <div className="logo-slider">
                <div className="logo-track">
                    {[...partners, ...partners].map((p, index) => (
                        <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logo-container"
                            key={index}
                            onMouseEnter={(e) => showTooltip(e, p)}
                            onMouseLeave={hideTooltip}
                        >
                            <img src={p.logo} alt={p.alt} />
                        </a>
                    ))}
                </div>
            </div>

            <TooltipPortal tooltip={tooltip} />
        </div>
    );
};

export default Partners;
