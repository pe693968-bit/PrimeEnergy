"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
useEffect(() => {
  let ctx = gsap.context(() => {
    // -----------------------------
    // 1. Title animation
    // -----------------------------
    gsap.fromTo(
      ".about-title span",
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".about-sec",
          start: "top 80%",
        },
      }
    );

    // -----------------------------
    // 2. Image reveal (white cover)
    // -----------------------------
    gsap.to(".image-cover", {
      x: "100%",
      duration: 1.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".image-container",
        start: "top 80%",
      },
    });

    // -----------------------------
    // 3. Right Side Feature Boxes → staggered
    // -----------------------------
    gsap.from(".feature-box", {
      scrollTrigger: {
        trigger: ".feature-box",
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.2, // ✅ 1 by 1
    });

    // -----------------------------
    // 4. Left Side UL → Feature Items → staggered
    // -----------------------------
    gsap.from(".feature-item", {
      scrollTrigger: {
        trigger: ".feature-item",
        start: "top 85%",
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15, // ✅ 1 by 1
    });

  }, sectionRef); // context bound to sectionRef

  return () => ctx.revert(); // cleanup on unmount
}, []);


  // Title Split
  const splitTitle = (text) =>
    text.split(" ").map((word, idx) => (
      <span key={idx} className="about-title inline-block overflow-hidden">
        <span className="inline-block opacity-0">{word}&nbsp;</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="about-sec main-container py-20 lg:py-28">
      {/* Top Heading */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full md:mb-16 max-md:mb-8">
        <div className="flex flex-col mb-6 lg:mb-0">
          <p className="bg-gray-300 text-[#f2801c] mb-5 w-20 h-7 flex justify-center items-center text-sm font-semibold rounded">
            About us
          </p>

          <h1 className="text-black text-4xl md:text-5xl font-bold font-jakarta leading-tight">
            {splitTitle("We are the best of")}
            <br />
            {splitTitle("renewable energy")}
          </h1>
        </div>

        <p className="text-gray-600 text-md w-full lg:w-1/2 text-left lg:text-right">
          At Mentary, we believe in the power of renewable energy to create a more sustainable future. With a passion for clean energy and a commitment to our customers, we are dedicated to delivering the best possible solutions.
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 w-full">

        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <p className="text-gray-600 text-md">
            We're committed to revolutionizing the way you think about energy. Say goodbye to skyrocketing utility bills and hello to a brighter, greener future with our state-of-the-art solar energy solutions.
          </p>

          <p className="text-gray-600 text-md">
            Your premier source for sustainable energy solutions. Explore our range of solar products and services designed to meet your energy needs.
          </p>

          {/* Feature List with Animation */}
          <ul className="flex flex-col space-y-3">
            {[
              "Expertise and Experience",
              "Free Consultation and Site Assessment",
              "High-Quality Solar Products",
              "Comprehensive End-to-End Services",
            ].map((item, index) => (
              <li
                key={index}
                className="feature-item flex items-center gap-3 text-gray-600 text-md "
              >
                <FaCheckCircle className="text-[#f2801c] w-5 h-5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div>
            <a href="/about">
            <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
              <p className="z-10">Get A Quote</p>
              <ArrowRight
                size={22}
                className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                />
            </button>
                </a>
          </div>
        </div>

        {/* Middle Column – Image */}
        <div className="image-container relative w-full lg:w-1/3 h-[484px] bg-black overflow-hidden rounded-lg group">
  {/* White overlay for subtle brightness */}
  <div className="absolute w-full h-full bg-white z-20 left-0 top-0 image-cover"></div>

  {/* Decorative Elements */}
  <div className="w-7 h-7 absolute left-7 z-10 bg-white rounded-full"></div>
  <div className="w-7 h-7 absolute top-7 z-10 bg-white rounded-full"></div>

  {/* Main Image */}
  <Image
    src="/about-us-img.jpg"
    alt="about-us-image"
    fill
    style={{ objectFit: "cover" }}
    className="absolute top-0 left-0"
  />

  {/* Shine Effect */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="shine absolute top-0 -left-1/2 w-1/2 h-full opacity-20 rotate-12 transform translate-x-0 transition-transform duration-700 ease-in-out group-hover:translate-x-[200%] group-hover:opacity-40"></div>
  </div>
</div>


        {/* Right Column – Feature Boxes */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          {[
            { icon: "/icon1.svg", title: "Peak Shaving", desc: "We understand that every home and business is unique." },
            { icon: "/icon2.svg", title: "Demand Response", desc: "We understand that every home and business is unique." },
            { icon: "/icon3.svg", title: "Load Shifting", desc: "We understand that every home and business is unique." },
            { icon: "/icon4.svg", title: "Environmental Benefits", desc: "We understand that every home and business is unique." },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 feature-box">
              <div className="bg-[#f2801c] rounded-full max-md:p-2 mt-1 p-3 flex-shrink-0">
                <img src={item.icon} alt={item.title} width={33} height={33} className="max-md:w-6 max-md:h-6" />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
                <p className="text-gray-600 text-md">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
