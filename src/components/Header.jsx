// components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header({ theme, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (sectionId) => {
        setMenuOpen(false);
        if (location.pathname !== "/") {
            navigate("/");
            // Wait for React to render the home page, then scroll
            setTimeout(() => scrollToSection(sectionId), 150);
        } else {
            scrollToSection(sectionId);
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const handleHomeClick = () => {
        setMenuOpen(false);
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <header>
                <nav aria-label="Main navigation">
                    <div className="logo">
                        <Link to="/" onClick={handleHomeClick}>
                            Fred<span className="gradient-text">Okech</span>.
                        </Link>
                    </div>

                    {/* Mobile right-side: theme toggle + hamburger */}
                    <div className="nav-actions">
                        {/* Theme toggle — visible on mobile only; desktop uses the fixed FAB */}
                        <button
                            className="theme-toggle theme-toggle-mobile"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>

                        <div
                            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                            role="button"
                            tabIndex="0"
                            aria-expanded={menuOpen}
                            aria-label="Toggle navigation menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                            onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(!menuOpen)}
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li>
                            <button className="nav-link" onClick={handleHomeClick}>
                                Home
                            </button>
                        </li>
                        {['about', 'projects', 'playground', 'contact'].map(link => (
                            <li key={link}>
                                <button className="nav-link" onClick={() => handleNavClick(link)}>
                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* Fixed bottom-right theme toggle — desktop only */}
            <button
                className="theme-toggle-fab"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        </>
    );
}

function SunIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}
