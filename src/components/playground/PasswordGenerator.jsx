import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);
    const [password, setPassword] = useState("Click Generate");

    const generatePassword = () => {
        let charSet = "";
        if (uppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
        if (numbers) charSet += "0123456789";
        if (symbols) charSet += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (!charSet) {
            setPassword("Select at least one option");
            return;
        }

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            generatedPassword += charSet[randomIndex];
        }
        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        // Optional: Add a temporary "Copied!" state feedback here
    };

    return (
        <PlaygroundCard title="🔐 Password Generator">
            <p>Create secure, random passwords.</p>

            {/* Display Result */}
            <div className="password-display" onClick={copyToClipboard} title="Click to copy">
                <span>{password}</span>
                <span className="copy-icon">📋</span>
            </div>

            {/* Length Slider */}
            <div className="slider-row" style={{ margin: "1rem 0" }}>
                <span className="slider-label" style={{ width: "60px", textAlign: "left", fontSize: "0.85rem" }}>Length</span>
                <input
                    type="range"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                />
                <span className="slider-value">{length}</span>
            </div>

            {/* Checkboxes */}
            <div className="checkbox-grid">
                <label className="checkbox-label">
                    <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} /> Uppercase
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} /> Lowercase
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} /> Numbers
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} /> Symbols
                </label>
            </div>

            <button className="run-btn" style={{ width: "100%", marginTop: "1rem" }} onClick={generatePassword}>
                Generate Password
            </button>
        </PlaygroundCard>
    );
};

export default PasswordGenerator;