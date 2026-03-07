//pages/Home.jsx
import Hero from '../components/Hero';
import About from '../components/About';
import LimeBand from '../components/LimeBand';
import Partners from '../components/Partners';
import Projects from '../components/Projects';
import Playground from '../components/Playground';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <LimeBand />
      <Partners />
      <Projects />
      <Playground />
      <Contact />
    </>
  );
}
