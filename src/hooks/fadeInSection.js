// src/hooks/fadeInSection.js
// Attaches an IntersectionObserver to a ref'd element and adds the
// "is-visible" class once it enters the viewport (fires once, stays visible).
//
// FIX: The original version passed an `options` object as a useEffect dependency.
// Because objects are compared by reference, a default-value object literal
// `{ threshold: 0.15 }` created a brand-new reference on every render, causing
// the effect to tear down and re-create the observer on every single re-render.
// The fix: accept a plain `threshold` number (a primitive — stable across renders)
// instead of an options object, so the dependency array is safe.
import { useEffect, useRef } from "react";

const fadeInSection = (threshold = 0.15) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Once visible, stop observing — there's no need to keep the
          // observer alive or re-trigger on scroll-back.
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    // Clean up when the component unmounts or threshold changes.
    return () => observer.disconnect();
  }, [threshold]); // threshold is a number — safe as a dep

  return ref;
};

export default fadeInSection;
