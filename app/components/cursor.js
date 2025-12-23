'use client'
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Mouse movement with GSAP
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover detection
    const hoverEls = document.querySelectorAll("a, button, img, .hover-target");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHover(true));
        el.removeEventListener("mouseleave", () => setHover(false));
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 rounded-full transition-all duration-300 ease-out transform 
        ${hover
          ? "w-20 h-20 bg-[#f2801c]  invert-img shadow-inner mix-blend-overlay"
          : "w-3 h-3 bg-[#f2801c]"
      }`}
    ></div>
  );
};

export default CustomCursor;
