// components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (sectionId) => {
        setMenuOpen(false);

        // If we are not on homepage, navigate there first
        if (location.pathname !== "/") {
            navigate("/");
            // Wait for page load then scroll
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        } else {
            scrollToSection(sectionId);
        }
    };

    // Helper function to scroll with offset
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80; // Height of your header + a little margin
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header>
            <nav aria-label="Main navigation">
                <div className="logo">
                    <Link to="/" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        Fred<span className="gradient-text">Okech</span>.
                    </Link>
                </div>

                <div
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    role="button"
                    tabIndex="0"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {/* Added Home explicitly for better UX */}
                    <li>
                         <button className="nav-link" onClick={() => scrollToSection('hero')}>
                            Home
                        </button>
                    </li>
                    {['about', 'projects', 'playground', 'contact'].map(link => (
                        <li key={link}>
                            <button className="nav-link" onClick={() => handleNavClick(link)} >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}