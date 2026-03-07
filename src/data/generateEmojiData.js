import fs from "fs";
import https from "https";

const EMOJI_SOURCE =
  "https://unicode.org/Public/emoji/latest/emoji-test.txt";

https.get(EMOJI_SOURCE, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const lines = data.split("\n");

    const emojis = [];

    lines.forEach((line) => {
      if (!line.includes("; fully-qualified")) return;

      const parts = line.split("#");
      const emojiPart = parts[1].trim();

      const emoji = emojiPart.split(" ")[0];
      const name = emojiPart.substring(emoji.length).trim();

      emojis.push({
        icon: emoji,
        name: name,
      });
    });

    const output =
      "const emojiData = " +
      JSON.stringify(emojis, null, 2) +
      ";\n\nexport default emojiData;";

    fs.writeFileSync("./emojiData.js", output);

    console.log(`✅ Generated ${emojis.length} emojis`);
  });
});