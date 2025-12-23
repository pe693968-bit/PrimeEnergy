"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function ScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
