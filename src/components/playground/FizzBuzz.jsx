//components/playground/FizzBuzz.jsx
import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const FizzBuzz = () => {
  const [num, setNum] = useState(15);
  const [result, setResult] = useState("");

  const runFizzBuzz = () => {
    let output = [];
    for (let i = 1; i <= num; i++) {
      if (i % 3 === 0 && i % 5 === 0) output.push("FizzBuzz");
      else if (i % 3 === 0) output.push("Fizz");
      else if (i % 5 === 0) output.push("Buzz");
      else output.push(i);
    }
    setResult(output.join(", "));
  };

  return (
    <PlaygroundCard title="⚡ FizzBuzz Generator">
      <p>Enter a limit to generate the sequence.</p>
      <div className="input-group">
        <input 
            type="number" 
            min="1" 
            max="100" // Limited to 100 for display purposes
            value={num} 
            onChange={(e) => setNum(Number(e.target.value))} 
        />
        <button className="run-btn" onClick={runFizzBuzz}>Run</button>
      </div>
      <div className="result-box fizz-result">{result || "Result will appear here..."}</div>
    </PlaygroundCard>
  );
};

export default FizzBuzz;