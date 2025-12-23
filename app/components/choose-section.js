"use client";
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Choose = () => {
  const sectionRef = useRef(null);

  const splitTitle = (text) =>
    text.split(" ").map((word, idx) => (
      <span key={idx} className="inline-block overflow-hidden">
        <span className="inline-block opacity-0 translate-y-10">{word}&nbsp;</span>
      </span>
    ));

useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      // -----------------------------
      // Titles animation
      // -----------------------------
      gsap.to(section.querySelectorAll(".animate-title span span"), {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // -----------------------------
      // Descriptions animation
      // -----------------------------
      gsap.from(section.querySelectorAll(".animate-desc"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // -----------------------------
      // Buttons animation
      // -----------------------------
      gsap.from(section.querySelectorAll(".animate-btn"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // -----------------------------
      // Image overlay slide animation
      // -----------------------------
      gsap.utils.toArray(section.querySelectorAll(".image-overlay")).forEach((overlay) => {
        gsap.fromTo(
          overlay,
          { x: "0%" },
          {
            x: "100%",
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: overlay,
              start: "top 90%",
            },
          }
        );
      });

      // -----------------------------
      // Shine hover effect
      // -----------------------------
      gsap.utils.toArray(section.querySelectorAll(".image-choose-container.group")).forEach((img) => {
        const shine = img.querySelector(".shine");
        if (!shine) return;

        img.addEventListener("mouseenter", () => {
          gsap.fromTo(
            shine,
            { x: "-200%", opacity: 0 },
            { x: "200%", opacity: 0.4, duration: 1.2, ease: "power2.out" }
          );
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(shine, { x: "-200%", opacity: 0, duration: 0.5, ease: "power2.out" });
        });
      });

    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);


  return (
    <div ref={sectionRef} className="main-choose main-container py-20">
      <div className="flex px-5 flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Content */}
        <div className="left w-full lg:w-[45%] flex flex-col gap-6">
          <p className="bg-[#ffd4aeb4] text-[#f2801c] p-1 w-30">why choose us</p>
          <h1 className="text-5xl max-md:text-3xl font-semibold animate-title">
            {splitTitle("A positive impact for your home and the planet")}
          </h1>
          <p className="animate-desc">
            At Mentary, we believe in the power of renewable energy to create a
            more sustainable future. With a passion for clean energy and a
            commitment to our customers, we are dedicated to delivering the best
            possible solutions.
          </p>
          <div>
            <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 flex items-center gap-2 animate-btn group">
              <p className="z-10">Get A Quote</p>
              <ArrowRight className="z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </button>
          </div>
        </div>

        {/* Right Images */}
        <div className="right flex flex-col lg:flex-row gap-5">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Top Image */}
            <div className="image-choose-container relative w-[280px] h-[280px] overflow-hidden group">
              <Image
                src="/why-choose-img-1.jpg"
                alt="choose-image-1"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="image-overlay absolute inset-0 bg-white z-20 pointer-events-none"></div>
              <div className="shine absolute top-0 -left-1/2 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 rotate-12 opacity-20 pointer-events-none"></div>
            </div>

            {/* Feature Box */}
            <div className="image-choose-container choose-border p-4 w-[280px] flex flex-col justify-center items-center gap-3 h-[280px] relative group overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-[#fdbf8934] transition-all duration-500 ease-in-out group-hover:h-full z-10 pointer-events-none"></div>
              <img src="/icon2.png" alt="" width={40} className="relative z-20" />
              <h1 className="text-xl font-semibold animate-title relative z-20">
                {splitTitle("High Quality")}
              </h1>
              <p className="text-center animate-desc text-black relative z-20">
                Aenean mattis mauris turpis, quis porta magna aliquam
              </p>
              <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer animate-btn relative z-20">
                Learn more <ArrowRight size={20} />
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Feature Box */}
            <div className="image-choose-container choose-border p-4 w-[280px] flex flex-col justify-center items-center gap-3 h-[280px] relative group overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-[#fdbf8934] transition-all duration-500 ease-in-out group-hover:h-full z-10 pointer-events-none"></div>
              <img src="/icon2.png" alt="" width={40} className="relative z-20" />
              <h1 className="text-xl font-semibold animate-title relative z-20">
                {splitTitle("Expertise")}
              </h1>
              <p className="text-center animate-desc text-black relative z-20">
                Aenean mattis mauris turpis, quis porta magna aliquam
              </p>
              <p className="service-link text-[#f2801c] flex items-center gap-2 cursor-pointer animate-btn relative z-20">
                Learn more <ArrowRight size={20} />
              </p>
            </div>

            {/* Bottom Image */}
            <div className="image-choose-container relative w-[280px] h-[280px] overflow-hidden group">
              <Image
                src="/why-choose-img-2.jpg"
                alt="choose-image-2"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="image-overlay absolute inset-0 bg-white z-20 pointer-events-none"></div>
              <div className="shine absolute top-0 -left-1/2 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 rotate-12 opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
