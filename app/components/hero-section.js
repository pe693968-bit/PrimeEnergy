"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Title animation
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
    });

    // Description animation
    tl.from(
      descRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 1,
      },
      "-=0.8"
    );

    // Buttons animation
    tl.from(
      buttonsRef.current,
      {
        opacity: 0,
        y: 25,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.5,
      },
      "-=0.7"
    );
  });

  // 🔥 CLEANUP ON UNMOUNT / ROUTE CHANGE
  return () => ctx.revert();
}, []);


  return (
    <div
      className="relative w-full h-full py-40 bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
        <p className="text-[#fcbf8b] font-bold text-lg sm:text-xl md:text-2xl mb-3">
          Welcome to Prime Energy
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-white font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] leading-snug md:leading-tight mb-5 text-shadow-2xs font-jakarta"
        >
          Empowering your future <br /> with solar energy
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white text-base sm:text-lg md:text-xl mb-7 max-w-3xl max-md:font-normal font-semibold"
        >
          At SolarBright, we're committed to revolutionizing the way you think about energy.
          Say goodbye to skyrocketing utility bills and hello to a brighter, greener future
          with our state-of-the-art solar energy solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-3">
          <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
            <p className="z-10 font-jakarta">
              <a href="/services">
              Get Started
              </a>
              </p>

            <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </button>

              <a href="/about">
          <button className="relative cursor-pointer text-md overflow-hidden bg-[white] nav-btn2 text-black font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
            <p className="z-10 font-jakarta">
              View Projects
              
              </p>
              
            <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </button>
              </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
