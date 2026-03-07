//components/playground/WordCounter.jsx
import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const WordCounter = () => {
  const [text, setText] = useState("");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <PlaygroundCard title="📝 Word Counter">
      <p>Type or paste text below to analyze it.</p>
      <textarea
        rows="4"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="word-stats">
        <div className="stat-item">
          <span className="stat-label">Words</span>
          <span className="stat-value">{wordCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Characters</span>
          <span className="stat-value">{charCount}</span>
        </div>
      </div>
    </PlaygroundCard>
  );
};

export default WordCounter;