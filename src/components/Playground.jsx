import React, { useState } from "react";
import fadeInSection from "../hooks/fadeInSection";
import PlaygroundModal from "./playground/PlaygroundModal";
import LauncherCard from "./playground/LauncherCard";

// Import the actual game components
import ColorMixer from "./playground/ColorMixer";
import NumberGuess from "./playground/NumberGuess";
import WordCounter from "./playground/WordCounter";
import RandomJoke from "./playground/RandomJoke";
import PalindromeChecker from "./playground/PalindromeChecker";
import FizzBuzz from "./playground/FizzBuzz";
import PasswordGenerator from "./playground/PasswordGenerator";
import Stopwatch from "./playground/StopWatch";
import EmojiFilter from "./playground/EmojiFilter";
import ComingSoon from "./playground/ComingSoon";

// 1. Define your catalog of games here (Metadata only)
// This array can grow indefinitely without affecting page load much
const gamesCatalog = [
  {
    id: "color-mixer",
    icon: "🎨",
    title: "Color Mixer",
    description: "Mix RGB values in real-time.",
    component: ColorMixer,
  },
  {
    id: "number-guess",
    icon: "🎲",
    title: "Guess the Number",
    description: "A classic guessing game 1-100.",
    component: NumberGuess,
  },
  {
    id: "word-count",
    icon: "📝",
    title: "Word Counter",
    description: "Analyze text and character counts.",
    component: WordCounter,
  },
  {
    id: "jokes",
    icon: "😂",
    title: "Dev Jokes",
    description: "Random programming humor.",
    component: RandomJoke,
  },
  {
    id: "palindrome",
    icon: "🔄",
    title: "Palindrome Check",
    description: "Check if words read the same backwards.",
    component: PalindromeChecker,
  },
  {
    id: "fizzbuzz",
    icon: "⚡",
    title: "FizzBuzz",
    description: "The classic interview algorithm.",
    component: FizzBuzz,
  },
  {
    id: "password-gen",
    icon: "🔐",
    title: "Password Gen",
    description: "Create secure random passwords.",
    component: PasswordGenerator,
  },
  {
    id: "stopwatch",
    icon: "⏱️",
    title: "Stopwatch",
    description: "Precise timer with millisecond accuracy.",
    component: Stopwatch,
  },
  {
    id: "emoji-search",
    icon: "😎",
    title: "Emoji Search",
    description: "Instant array filtering demo.",
    component: EmojiFilter,
  },
  {
    id: "coming-soon",
    icon: "🚀",
    title: "More Coming",
    description: "New experiments are on the way.",
    component: ComingSoon,
  },
];

const Playground = () => {
  const sectionRef = fadeInSection();

  // State for Modal
  const [activeGame, setActiveGame] = useState(null);

  const openGame = (game) => setActiveGame(game);
  const closeModal = () => setActiveGame(null);

  return (
    <section id="playground" ref={sectionRef} className="fade-in-section" aria-labelledby="playground-header">
      <div className="section-header">
        <h2 id="playground-header">Code Playground</h2>
        <p>Interactive JavaScript demos. Click to launch.</p>
      </div>

      {/* 2. Render the Catalog Grid */}
      <div className="grid launcher-grid">
        {gamesCatalog.map((game) => (
          <LauncherCard
            key={game.id}
            icon={game.icon}
            title={game.title}
            description={game.description}
            onClick={() => openGame(game)}
          />
        ))}
      </div>

      {/* 3. The Modal */}
      <PlaygroundModal
        isOpen={!!activeGame}
        onClose={closeModal}
        title={activeGame?.title}
      >
        {/* Render the specific component inside the modal */}
        {activeGame && <activeGame.component />}
      </PlaygroundModal>
    </section>
  );
};

export default Playground;