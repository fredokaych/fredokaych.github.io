//pages/Lecturers2007.jsx
import React from "react";
import { lecturers2007 } from "../data/lecturers2007";

const Lecturers2007 = () => {
    return (
        <main className="lecturers-page">
            {/* Page Hero / Header */}
            <section className="lecturers-hero">
                <h1>57 Lecturers</h1>
                <p>Osingo Mixed Secondary School – Class of 2007</p>
                <p className="tagline">Once classmates. Always family.</p>
            </section>

            {/* Grid of lecturers */}
            <section className="lecturers-grid">
                {lecturers2007.map((person) => (
                    <div
                        key={person.id}
                        className={`lecturer-card ${person.status === "rip" ? "rip" : ""}`}
                    >
                        <div className="photo-wrapper">
                            <span className="badge-number">{person.id}</span>

                            <img
                                src={person.photo}
                                alt={person.name}
                                className="lecturer-photo"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = "lecturers/placeholder.jpg";
                                }}
                            />
                        </div>

                        <h3>{person.name}</h3>

                        {person.nickname && (
                            <p className="lecturer-nickname">"{person.nickname}"</p>
                        )}

                        {person.phone && <p className="lecturer-phone">{person.phone}</p>}

                        {person.status === "rip" && <span className="rip-label">RIP</span>}
                    </div>


                ))}
            </section>
        </main>
    );
};

export default Lecturers2007;
