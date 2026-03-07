import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";
import emojiData from "../../data/emojiData";

const EmojiFilter = () => {
  const [query, setQuery] = useState("");

  const filteredEmojis = emojiData.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PlaygroundCard title="😎 Emoji Search">
      <p>Filter through a list of emojis instantly.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Type 'fire' or 'sad'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="emoji-grid">
        {filteredEmojis.length > 0 ? (
          filteredEmojis.slice(0, 300).map((e, idx) => (
            <div key={idx} className="emoji-item" title={e.name}>
              {e.icon}
            </div>
          ))
        ) : (
          <p
            style={{
              color: "var(--text-muted)",
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            No emojis found.
          </p>
        )}
      </div>
    </PlaygroundCard>
  );
};

export default EmojiFilter;