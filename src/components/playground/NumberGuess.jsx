//components/playground/NumberGuess.jsx
import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const NumberGuess = () => {
  const [guess, setGuess] = useState("");
  // Initialize target only once
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [result, setResult] = useState("I'm thinking of a number...");

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
        setResult("Enter a valid number!");
        return;
    }
    
    if (num < target) setResult("📉 Too low! Try again.");
    else if (num > target) setResult("📈 Too high! Try again.");
    else setResult("🎉 Correct! You got it!");
  };

  // Determine result class for styling
  const resultClass = result.includes("Correct") ? "success" : result.includes("low") || result.includes("high") ? "" : "error";

  return (
    <PlaygroundCard title="🎲 Number Guessing Game">
      <p>Guess a number between 1 and 100.</p>
      <div className="input-group">
        <input 
            type="number" 
            min="1" 
            max="100" 
            value={guess} 
            onChange={(e) => setGuess(e.target.value)} 
            placeholder="1-100"
        />
        <button className="run-btn" onClick={checkGuess}>Check</button>
      </div>
      <div className={`result-box ${resultClass}`}>{result}</div>
    </PlaygroundCard>
  );
};

export default NumberGuess;