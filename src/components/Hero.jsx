// components/Hero.jsx
import { useRef, useEffect } from "react";
import fadeInSection from "../hooks/fadeInSection";

// ─── Particle class ──────────────────────────────────────────────────────────
// Moved OUTSIDE the component so it is defined once per module, not re-created
// on every render.  Previously being defined inside the component body meant a
// new class expression was evaluated on every render.
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.baseDirectionX = directionX;
    this.baseDirectionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx, canvas, mouse) {
    this.x += this.directionX;
    this.y += this.directionY;

    // Bounce off edges
    if (this.x + this.size > canvas.width)  { this.x = canvas.width - this.size;  this.directionX = -this.directionX;  this.baseDirectionX = -this.baseDirectionX; }
    if (this.x - this.size < 0)             { this.x = this.size;                 this.directionX = -this.directionX;  this.baseDirectionX = -this.baseDirectionX; }
    if (this.y + this.size > canvas.height) { this.y = canvas.height - this.size; this.directionY = -this.directionY;  this.baseDirectionY = -this.baseDirectionY; }
    if (this.y - this.size < 0)             { this.y = this.size;                 this.directionY = -this.directionY;  this.baseDirectionY = -this.baseDirectionY; }

    // Mouse repulsion
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius + this.size) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        this.directionX -= force * Math.cos(angle) * 0.5;
        this.directionY -= force * Math.sin(angle) * 0.5;
      }
    }

    // Damp back to base speed
    this.directionX += (this.baseDirectionX - this.directionX) * 0.05;
    this.directionY += (this.baseDirectionY - this.directionY) * 0.05;

    this.draw(ctx);
  }
}

// Maximum number of particles regardless of screen size.
// Without this cap, very large screens (or high-DPI mobile) can spawn
// hundreds of particles and drain battery / frame rate.
const MAX_PARTICLES = 120;

// ─── Component ───────────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = fadeInSection();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  // rafIdRef lets us cancel the animation frame on unmount to avoid running
  // animations in invisible / unmounted canvases.
  const rafIdRef = useRef(null);
  // pausedRef tracks whether the tab is hidden so we skip rAF work.
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const initParticles = () => {
      particlesRef.current = [];
      const raw = (canvas.width * canvas.height) / 11000;
      const count = Math.min(Math.floor(raw), MAX_PARTICLES);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        particlesRef.current.push(
          new Particle(
            Math.random() * (canvas.width  - size * 2) + size,
            Math.random() * (canvas.height - size * 2) + size,
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2,
            size,
            "#16a34a"
          )
        );
      }
    };

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    const connectParticles = () => {
      const pts = particlesRef.current;
      const threshSq = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          const dx = pts[a].x - pts[b].x;
          const dy = pts[a].y - pts[b].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < threshSq) {
            ctx.strokeStyle = `rgba(22,163,74,${1 - distSq / 20000})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Skip drawing while the tab is hidden — saves CPU/battery.
      if (!pausedRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current.forEach((p) => p.update(ctx, canvas, mouseRef.current));
        connectParticles();
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    // ── Event handlers ──
    const onMouseMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const onMouseOut  = ()  => { mouseRef.current.x = null;      mouseRef.current.y = null; };

    // Pause the animation loop when the tab is not visible.
    // This prevents draining battery/CPU when the user switches tabs.
    const onVisibilityChange = () => {
      pausedRef.current = document.hidden;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout",  onMouseOut);
    window.addEventListener("resize",    resizeCanvas);
    document.addEventListener("visibilitychange", onVisibilityChange);

    resizeCanvas();
    animate();

    return () => {
      // Cancel the pending animation frame so it doesn't fire after unmount.
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout",  onMouseOut);
      window.removeEventListener("resize",    resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []); // no deps — canvas setup runs once on mount

  return (
    <section id="hero" aria-label="Hero section">
      <canvas id="canvas-bg" ref={canvasRef} aria-hidden="true" />
      <div className="hero-content fade-in-section" ref={sectionRef}>
        <p className="hero-subtitle">Hi, my name is</p>
        <h1 className="hero-title">Fred Okech.</h1>
        <p className="hero-desc">
          I build exceptional digital experiences. I specialise in turning complex
          problems into simple, beautiful, and scalable web applications.
        </p>
        <p className="hero-stack">React • Node.js • Python</p>

        <div className="hero-btns">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </button>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
};

export default Hero;
