//components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (sectionId) => {
        setMenuOpen(false);

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);
        } else {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (
        <header>
            <nav aria-label="Main navigation">
                <div className="logo">
                    <Link to="/" onClick={() => {
                        setMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                        Fred<span className="gradient-text">Okech</span>.
                    </Link>
                </div>

                <div
                    className="menu-toggle"
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
