// src/context/ThemeContext.jsx
// Centralised theme state so any component can read/toggle the theme
// without prop-drilling through the component tree.
import { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const themeValue = useTheme();
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useThemeContext()
 * Consume the theme anywhere without importing the raw hook.
 * Returns { theme, toggleTheme }.
 */
export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used inside <ThemeProvider>");
  return ctx;
}
