// App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lecturers2007 from "./pages/Lecturers2007";

// Initialise GA once, outside the component so it never double-fires
// even under React Strict Mode or hot-reload.
ReactGA.initialize("G-HLEKES7WWM");

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

export default function App() {
  // Theme is now consumed from ThemeContext wherever needed (e.g. Header).
  // App no longer needs to own theme state or pass it down as props.
  return (
    <>
      <Header />
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/57-lecturers" element={<Lecturers2007 />} />
      </Routes>
      <Footer />
    </>
  );
}
