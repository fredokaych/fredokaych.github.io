//components/playground/PalindromeChecker.jsx
import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const PalindromeChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("Waiting for input...");

  const checkPalindrome = () => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!cleaned) {
      setResult("Please enter some text.");
      return;
    }
    const reversed = cleaned.split("").reverse().join("");
    
    if (cleaned === reversed) {
        setResult("✅ Yes! It's a palindrome.");
    } else {
        setResult("❌ Nope, not a palindrome.");
    }
  };

  const resultClass = result.includes("Yes") ? "success" : result.includes("Nope") ? "error" : "";

  return (
    <PlaygroundCard title="🔄 Palindrome Checker">
      <p>Checks if text reads the same backward as forward.</p>
      <div className="input-group">
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="e.g. Racecar" 
        />
        <button className="run-btn" onClick={checkPalindrome}>Run</button>
      </div>
      <div className={`result-box ${resultClass}`}>{result}</div>
    </PlaygroundCard>
  );
};

export default PalindromeChecker;
