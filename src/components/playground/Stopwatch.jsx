import React, { useState, useRef } from "react";
import PlaygroundCard from "./PlaygroundCard";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <PlaygroundCard title="⏱️ Stopwatch">
      <p>Accurate to the millisecond.</p>
      
      <div className="stopwatch-display">
        {formatTime(time)}
      </div>

      <div className="stopwatch-controls">
        {!isRunning ? (
          <button className="run-btn" onClick={start}>Start</button>
        ) : (
          <button className="run-btn" style={{ background: "#ef4444" }} onClick={stop}>Stop</button>
        )}
        <button className="run-btn" style={{ background: "transparent", border: "1px solid var(--text-muted)", color: "var(--text-secondary)" }} onClick={reset}>Reset</button>
      </div>
    </PlaygroundCard>
  );
};

export default Stopwatch;