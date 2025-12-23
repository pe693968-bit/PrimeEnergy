"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {
const sectionRef = useRef(null); // Add ref for gsap.context

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for all animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".service-cards",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate cards sequentially
      tl.from(".service-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.25, // 1 by 1 fade
      });

      // Animate titles inside each card
      tl.from(
        ".service-card h1",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.25,
        },
        "-=0.8"
      );

      // Animate descriptions
      tl.from(
        ".service-desc",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.25,
        },
        "-=0.7"
      );

      // Animate "Learn more" links
      tl.from(
        ".service-link, .chose-link",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.25,
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div className="bg-[#f9b48031] py-15 px-5 md:px-10">
  <section ref={sectionRef} className="Service-sec main-container mx-auto max-w-[1280px]">
    {/* Top Heading */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full md:mb-16 mb-8">
      <div className="flex flex-col mb-6 lg:mb-0">
        <p className="bg-[#fcc99d5d] text-[#fa9135] mb-5 w-20 h-7 flex justify-center items-center text-sm font-semibold rounded">
          SERVICE US
        </p>

        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-jakarta leading-snug">
          Best offer for
          <br />
          renewable energy
        </h1>
      </div>

      <p className="text-gray-600 text-sm sm:text-md md:text-md w-full lg:w-1/2 text-left lg:text-right">
        At Mentary, we believe in the power of renewable energy to create a more sustainable future. With a passion for clean energy and a commitment to our customers, we are dedicated to delivering the best possible solutions.
      </p>
    </div>

    {/* Service Cards */}
    <div className="service-cards flex flex-wrap justify-center lg:justify-between items-start gap-x-6 gap-y-10">
  {/* Card 1 */}
  <div className="service-card shadow-lg group max-md:mt-10 relative w-full sm:w-80 md:w-66 p-8 md:p-10 bg-white flex flex-col gap-3 justify-center items-center overflow-hidden  -translate-y-2 md:-translate-y-6">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-7 left-0 z-20 absolute"></div>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-0 left-7 z-20 absolute"></div>
    <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
    <div className="relative w-12 h-12 sm:w-13 sm:h-13 z-10">
      <Image src="/solarpanel.png" alt="Solar Panel" fill className="object-contain" />
    </div>
    <h1 className="text-lg font-jakarta sm:text-xl font-bold z-10 group-hover:text-white transition-colors duration-300 text-center">
      Solar Panel Installation
    </h1>
    <p className="service-desc text-gray-600 text-center z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
      Fast, safe, and certified installation by experienced technicians.
    </p>
    <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
    <a href="/services" className="flex items-center gap-2">
      Learn more <ArrowRight size={20} />
    </a>
    </p>
  </div>

  {/* Card 2 */}
  <div className="service-card font-jakarta shadow-lg group relative w-full sm:w-80 md:w-66 p-8 md:p-10 bg-white flex flex-col gap-3 justify-center items-center overflow-hidden  md:mt-10">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-7 left-0 z-20 absolute"></div>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-0 left-7 z-20 absolute"></div>
    <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
    <div className="relative w-12 h-12 sm:w-13 sm:h-13 z-10">
      <Image src="/icon2.png" alt="Icon 2" fill className="object-contain" />
    </div>
    <h1 className="text-lg sm:text-xl font-bold z-10 group-hover:text-white transition-colors duration-300 text-center">
      Solar Panel Maintenance
    </h1>
    <p className="service-desc text-gray-600 text-center z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
      Ensure peak performance with regular inspections and cleaning.
    </p>
   <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
    <a href="/services" className="flex items-center gap-2">
      Learn more <ArrowRight size={20} />
    </a>
    </p>
  </div>

  {/* Card 3 */}
  <div className="service-card font-jakarta shadow-lg max-md:mt-5 group relative w-full sm:w-80 md:w-66 p-8 md:p-10 bg-white flex flex-col gap-3 justify-center items-center overflow-hidden  -translate-y-2 md:-translate-y-6">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-7 left-0 z-20 absolute"></div>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-0 left-7 z-20 absolute"></div>
    <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
    <div className="relative w-12 h-12 sm:w-13 sm:h-13 z-10">
      <Image src="/icon3.png" alt="Icon 3" fill className="object-contain" />
    </div>
    <h1 className="text-lg sm:text-xl font-bold z-10 group-hover:text-white transition-colors duration-300 text-center">
     Custom System Design
    </h1>
    <p className="service-desc text-gray-600 text-center z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
      We create efficient solar setups tailored to your energy goals.
    </p>
    <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
    <a href="/services" className="flex items-center gap-2">
      Learn more <ArrowRight size={20} />
    </a>
    </p>
  </div>

  {/* Card 4 */}
  <div className="service-card font-jakarta shadow-lg group relative w-full sm:w-80 md:w-66 p-8 md:p-10 bg-white flex flex-col gap-3 justify-center items-center overflow-hidden  md:mt-10">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-7 left-0 z-20 absolute"></div>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#f9b4805b] top-0 left-7 z-20 absolute"></div>
    <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
    <div className="relative w-12 h-12 sm:w-13 sm:h-13 z-10">
      <Image src="/icon4.png" alt="Icon 4" fill className="object-contain" />
    </div>
    <h1 className="text-lg sm:text-xl font-bold z-10 group-hover:text-white transition-colors duration-300 text-center">
      Solar Battery Storage
    </h1>
    <p className="service-desc text-gray-600 text-center z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
      Capture and store surplus solar energy for use anytime, even during outages.
    </p>
    <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
    <a href="/services" className="flex items-center gap-2">
      Learn more <ArrowRight size={20} />
    </a>
    </p>
  </div>
</div>


    {/* View All Services Button */}
    <div className="w-full flex justify-center items-center my-10 mt-20">
          <a href="/services">
      <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
        <p className="z-10 text-sm sm:text-md">
          View all Services
          </p>
        <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
      </button>
          </a>
    </div>
  </section>
</div>

  );
};

export default Service;
