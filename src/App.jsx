//App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from './components/Header';
import Footer from './components/Footer';
import Lecturers2007 from "./pages/Lecturers2007";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useTheme } from "./hooks/useTheme";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-HLEKES7WWM");
  }, []);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/57-lecturers" element={<Lecturers2007 />} />
      </Routes>
      <Footer />
    </>
  );
}
