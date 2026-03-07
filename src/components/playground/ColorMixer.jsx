//components/playground/ColorMixer.jsx
import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const ColorMixer = () => {
  const [red, setRed] = useState(100);
  const [green, setGreen] = useState(150);
  const [blue, setBlue] = useState(200);

  return (
    <PlaygroundCard title="🎨 Color Mixer">
      <p>Adjust RGB sliders to mix colors in real-time.</p>

      <div className="color-sliders">
        {/* Red */}
        <div className="slider-row">
          <span className="slider-label" style={{ color: "rgb(239,68,68)" }}>R</span>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(Number(e.target.value))}
            className="slider-red"
          />
          <span className="slider-value">{red}</span>
        </div>

        {/* Green */}
        <div className="slider-row">
          <span className="slider-label" style={{ color: "rgb(34,197,94)" }}>G</span>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(Number(e.target.value))}
            className="slider-green"
          />
          <span className="slider-value">{green}</span>
        </div>

        {/* Blue */}
        <div className="slider-row">
          <span className="slider-label" style={{ color: "rgb(59,130,246)" }}>B</span>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(Number(e.target.value))}
            className="slider-blue"
          />
          <span className="slider-value">{blue}</span>
        </div>
      </div>

      <div
        className="color-preview"
        style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
        title={`rgb(${red}, ${green}, ${blue})`}
      />
    </PlaygroundCard>
  );
};

export default ColorMixer;