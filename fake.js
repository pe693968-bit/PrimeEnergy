"use client";

import React, { useEffect, useRef } from "react";
import Topbar from "../components/topbar";
import Navbar from "../components/navbar";
import Image from "next/image";
import { Check, ShieldCheck, Users, ArrowRight } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ===== IMAGE CURTAIN REVEAL ===== */
      gsap.utils.toArray("[data-reveal]").forEach((overlay) => {
        gsap.fromTo(
          overlay,
          { xPercent: 0 },
          {
            xPercent: 100,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: overlay.parentElement,
              start: "top 80%",
            },
          }
        );
      });

      /* ===== EXPERIENCE BOX ===== */
      gsap.from("[data-exp]", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-exp]",
          start: "top 85%",
        },
      });

      /* ===== RIGHT CONTENT ===== */
      gsap.from("[data-content] > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-content]",
          start: "top 80%",
        },
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <Topbar />
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <div
        className="relative w-full h-[70vh] py-32 bg-cover bg-fixed bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="w-8 h-8 bg-white absolute bottom-0 right-8"></div>
        <div className="w-8 h-8 bg-white absolute bottom-8 right-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
          <div className="flex bg-[#f2801c] p-2 px-3 rounded-2xl items-center gap-2 text-sm text-white mb-4">
            <span className="font-semibold cursor-pointer">Home</span>
            <span className="opacity-60">/</span>
            <span className="font-semibold">About</span>
          </div>

          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight font-jakarta">
            About Us
          </h1>

          <p className="text-gray-200 font-jakarta text-base sm:text-md mt-4 max-w-2xl">
            We are committed to delivering innovative solar and renewable energy
            solutions that empower homes and businesses to achieve energy independence,
            reduce costs, and build a sustainable future.
          </p>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="relative flex flex-col items-center lg:block">

            {/* Main Image */}
            <div className="relative overflow-hidden">
              <Image
                src="/about-img-1.jpg"
                alt="Solar Home"
                width={420}
                height={420}
                className="w-full max-w-[420px]"
              />
              <div
                data-reveal
                className="absolute inset-0 bg-white"
              ></div>
            </div>

            {/* Experience Box */}
            <div
              data-exp
              className="
                absolute top-0 right-4 max-lg:hidden
                lg:right-4
                max-lg:left-1/2 max-lg:-translate-x-1/2
                bg-[#f2801c] text-white px-9 py-6 text-center
              "
            >
              <h2 className="text-4xl font-bold">15+</h2>
              <p className="text-sm font-medium mt-1">
                Years Of <br /> Experience
              </p>
            </div>

            {/* Second Image */}
            <div
              className="
                absolute right-0 -bottom-30
                lg:right-0
                max-lg:static max-lg:mt-6
                bg-white p-3
                relative overflow-hidden
              "
            >
              <Image
                src="/about-img-2.jpg"
                alt="Solar Expert"
                width={320}
                height={320}
              />
              <div
                data-reveal
                className="absolute inset-0 bg-white"
              ></div>
            </div>

            {/* Clients */}
            <div
              className="
                absolute -bottom-25 left-5
                lg:left-5
                max-lg:static max-lg:mt-6
                flex flex-col items-center gap-3
              "
            >
              <Image
                src="/satisfied-client-img.png"
                alt="Satisfied Clients"
                width={200}
                height={200}
              />
              <span className="text-sm font-semibold text-gray-700">
                10k+ Satisfied Clients
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            data-content
            className="pt-0 lg:pt-15 font-jakarta text-left lg:text-left"
          >
            <span className="inline-block bg-orange-100 text-[#f2801c] text-sm font-semibold px-4 py-1 mb-3">
              OUR STORY
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Let's build something <br className="hidden lg:block" /> strong together
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              We deliver high-quality solar and renewable energy solutions
              designed to provide long-term value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-[#f2801c]" />
                <div>
                  <h4 className="font-semibold">Building Quality Standards</h4>
                  <p className="text-sm text-gray-600">
                    Premium materials and strict quality control.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="text-[#f2801c]" />
                <div>
                  <h4 className="font-semibold">Certified Engineer Team</h4>
                  <p className="text-sm text-gray-600">
                    Skilled professionals with industry expertise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-gray-700 text-left">
              <div className="flex items-center gap-2">
                <Check className="text-[#f2801c]" /> Expertise & Experience
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-[#f2801c]" /> Quality Products
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-[#f2801c]" /> Customized Solutions
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-[#f2801c]" /> Environmental Impact
              </div>
            </div>

            <button className="mx-0 relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 flex items-center gap-2 group">
              <span className="z-10">Send Message</span>
              <ArrowRight
                size={22}
                className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
