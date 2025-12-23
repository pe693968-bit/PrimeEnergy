'use client'
import React, { useRef, useEffect } from 'react'
import Topbar from '../components/topbar'
import Navbar from '../components/navbar'
import Image from "next/image";
import { Check, ShieldCheck, Users, ArrowRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from 'react';
import Testimonial from '../components/testimonial-sections';
import Footer from '../components/footer';
import Project from '../components/project-section';
import TeamSection from '../components/team-section';

gsap.registerPlugin(ScrollTrigger);
const faqs = [
  {
    id: "01",
    question: "Consultation",
    answer:
      "We begin with a detailed consultation to understand your energy needs, budget, and goals, ensuring the right solar solution for you.",
  },
  {
    id: "02",
    question: "Site Evaluation",
    answer:
      "Our experts visit the site to assess location, sunlight exposure, roof structure, and technical feasibility for optimal system performance.",
  },
  {
    id: "03",
    question: "System Design",
    answer:
      "We design a customized solar system using high-quality components to maximize efficiency, safety, and long-term reliability.",
  },
  {
    id: "04",
    question: "Installation",
    answer:
      "Our certified engineers install the system with precision, following industry standards and safety protocols for seamless operation.",
  },
  {
    id: "05",
    question: "Monitoring & Support",
    answer:
      "After installation, we provide continuous monitoring and ongoing support to ensure optimal performance and peace of mind.",
  },
];

const About = () => {
      const [open, setOpen] = useState(null);
  const refs = useRef([]);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };
  const root = useRef(null);



 useEffect(() => {
  const ctx = gsap.context(() => {

    // ===== EXPERIENCE BOX =====
    const expObj = { val: 0 };
    gsap.to(expObj, {
      val: 15,
      duration: 1.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "[data-expe]",
        start: "top 85%",
        toggleActions: "play none none reverse", // safe for route changes
      },
      onUpdate: () => {
        const counter = Math.floor(expObj.val);
        const el = document.getElementById("exp-counter");
        if (el) el.innerText = counter;
      },
    });

    // ===== IMAGE CURTAIN REVEAL =====
    gsap.utils.toArray("[data-reveal]").forEach((overlay) => {
      gsap.fromTo(
        overlay,
        { xPercent: 0 },
        {
          xPercent: 100,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: overlay.parentElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // ===== RIGHT CONTENT =====
    gsap.from("[data-content] > *", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-content]",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // ===== STATS COUNTER SECTION =====
    gsap.utils.toArray("[data-stat]").forEach((box) => {
      const target = box.querySelector(".stat-number");
      const endValue = parseFloat(box.getAttribute("data-value"));
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endValue,
        duration: 1.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: box,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (!target) return;
          target.innerText =
            endValue % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1);
        },
      });
    });

  }, root);

  return () => ctx.revert(); // clean up on unmount
}, []);






  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      if (open === i) {
        // OPEN animation
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // CLOSE animation
        gsap.to(el, {
          height: 0,
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [open]);



  return (
    <div ref={root} className=''>
      <Topbar />
      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <div
        className="relative w-full h-[70vh] py-32 bg-cover bg-fixed bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className='w-8 h-8 bg-white absolute bottom-0 right-8'></div>
        <div className='w-8 h-8 bg-white absolute bottom-8 right-0'></div>

        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
          <div className="flex bg-[#f2801c] p-2 px-3 rounded-2xl items-center gap-2 text-sm text-white mb-4">
            <span className="font-semibold cursor-pointer">Home</span>
            <span className="opacity-60">/</span>
            <span className="font-semibold">About</span>
          </div>

          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight font-jakarta">
            About Us
          </h1>

          <p className="text-gray-200 font-jakarta text-sm sm:text-md mt-4 max-w-2xl">
            We are committed to delivering innovative solar and renewable energy
            solutions that empower homes and businesses to achieve energy independence,
            reduce costs, and build a sustainable future.
            <br className="hidden md:block" />
            Our focus is on quality, reliability, and long-term value for our clients.
          </p>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 md:mb-25 bg-white overflow-hidden">
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
                className=""
              />
              <div data-reveal className="absolute inset-0 bg-white"></div>
            </div>

            {/* Experience Box */}
            <div
  data-expe
  className="
    absolute top-0 right-4 max-lg:hidden
    lg:right-4
    max-lg:left-1/2 max-lg:-translate-x-1/2
    bg-[#f2801c] text-white px-9 py-6 text-center
  "
>
  <h2 className="text-4xl font-bold">
    <span id="exp-counter">0</span>+
  </h2>
  <p className="text-sm font-medium mt-1">
    Years Of <br /> Experience
  </p>
</div>


            {/* Second Image */}
           <div className="relative  lg:absolute lg:right-0 -bottom-40 max-md:-bottom-10 md:bg-white p-3 overflow-hidden">
  <Image
    src="/about-img-2.jpg"
    alt="Solar Expert"
    width={320}
    height={320}
    className="object-cover mb-10"
  />
  <div
    data-reveal
    className="absolute inset-0 bg-white z-10"
  ></div>
</div>


            {/* Clients */}
            <div className="
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
          <div data-content className="pt-0 lg:pt-15 font-jakarta text-left lg:text-left">

            <span className="inline-block bg-orange-100 text-[#f2801c] text-sm font-semibold px-4 py-1 mb-3">
              OUR STORY
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Let's build something <br className="hidden lg:block" /> strong together
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              We deliver high-quality solar and renewable energy solutions
              designed to provide long-term value, efficiency, and sustainability
              for residential and commercial clients.
            </p>

            {/* Features */}
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

            {/* Checklist */}
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

            {/* Button */}
            <a href="/contact">
            <button className="mx-0 lg:mx-0 relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
              <span className="z-10">Send Message</span>
              <ArrowRight
                size={22}
                className="relative -rotate-45 transition-transform duration-300 group-hover:rotate-0"
              />
            </button>
            </a>

          </div>
        </div>
      </section>
     <section className="w-full bg-[#f2801c] py-14 font-jakarta">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white">

    <div className="text-center border-r border-white/30 last:border-none" data-stat data-value="17">
      <h2 className="text-5xl font-bold">
        <span className="stat-number">0</span>+
      </h2>
      <p className="mt-2 text-lg font-medium">Years Experience</p>
    </div>

    <div className="text-center border-r border-white/30 last:border-none" data-stat data-value="20000">
      <h2 className="text-5xl font-bold">
        <span className="stat-number">0</span>+
      </h2>
      <p className="mt-2 text-lg font-medium">Projects Completed</p>
    </div>

    <div className="text-center border-r border-white/30 last:border-none" data-stat data-value="100000">
      <h2 className="text-5xl font-bold">
        <span className="stat-number">0</span>+
      </h2>
      <p className="mt-2 text-lg font-medium">Happy Customers</p>
    </div>

    <div className="text-center" data-stat data-value="4.7">
      <h2 className="text-5xl font-bold">
        <span className="stat-number">0</span>
      </h2>
      <p className="mt-2 text-lg font-medium">Overall Rating</p>
    </div>

  </div>
</section>




<div
  className="relative mb-15 w-full min-h-[90%] py-15 bg-cover bg-fixed bg-center flex items-center justify-center"
  style={{ backgroundImage: "url('/cta-bg-img.jpg')" }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>



  {/* Content */}
  <div className="relative z-10 text-center px-5 max-w-4xl flex flex-col items-center">
    
    {/* Small Badge */}
    <span className="bg-[#f2801c] text-white text-[12px] font-semibold px-2 py-2  mb-5">
      CONTACT US
    </span>

    {/* Heading */}
    <h1 className="text-white font-bold text-3xl sm:text-5xl  leading-tight font-jakarta">
      Ready to get started?
      <br />
      Let’s talk to us today
    </h1>

    {/* Description */}
    <p className="text-gray-200 text-base sm:text-lg mt-5 max-w-2xl">
      Our experts are ready to help you understand how solar can work
      for your home. Schedule a free, no-obligation consultation to
      assess your energy needs and potential savings.
    </p>

    {/* Arrow + Button */}
    <div className="flex flex-col items-center mt-8 gap-4">
      
      {/* Arrow SVG */}
      <img
        src="/svg-image-1.svg"
        alt="Arrow"
        className="w-20 max-md:w-15 absolute bottom-4 left-[10%] sm:left-[20%]  arrow-animate"
      />

      {/* Button */}
      <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
                  <p className="z-10 font-jakarta">Get Started</p>
                  <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </button>
    </div>
  </div>
</div>


<TeamSection/>
<Testimonial/>
<Project/>

<section className="bg-[white] py-20 md:py-24 mt-15 px-4 md:px-14">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
    
    {/* LEFT SIDE TEXT */}
    <div
      className="
        md:sticky md:top-10 
        py-5 md:py-10 
        h-max
        text-start md:text-left
      "
    >
      <span className="text-[10px] uppercase ml-2 md:text-xs tracking-widest font-semibold px-3 py-1 text-[#f2801c] bg-[#fdd1aa94] ">
        how it work
      </span>

      <h2
        className="
          mt-4 
          text-3xl sm:text-4xl md:text-[50px] 
          font-jakarta font-bold 
          leading-[1.3] 
          text-gray-900
          w-[90%]
          max-md:text-left
          px-2
        "
      >
        Making it easy a 
        
        simple guide to our
        Process
      </h2>
    </div>

    {/* RIGHT SIDE ACCORDION */}
    <div className="p-2 sm:p-4 md:p-8">
      {faqs.map((item, index) => (
        <div key={index} className="border-b border-gray-300 py-4 sm:py-6">
          
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-start justify-between text-left group gap-3"
          >
            <div className="flex items-start gap-3 sm:gap-5">
              <span
                className={`text-lg sm:text-2xl font-bold ${
                  open === index ? "text-[#f2801c]" : "text-gray-700"
                }`}
              >
                {item.id}
              </span>

              <span
                className={`
                  text-lg sm:text-2xl font-semibold 
                  transition duration-300 
                  ${open === index ? "text-[#f2801c]" : "text-gray-900"}
                `}
              >
                {item.question}
              </span>
            </div>

            <span
              className={`
                text-2xl sm:text-3xl font-light 
                transition-transform duration-300 
                ${open === index ? "rotate-45 text-[#f2801c]" : "rotate-0 text-gray-700"}
              `}
            >
              +
            </span>
          </button>

          {/* GSAP Animated Answer */}
          <div
            ref={(el) => (refs.current[index] = el)}
            className="overflow-hidden opacity-0 h-0"
          >
            <p className="text-gray-600 leading-relaxed ml-10 sm:ml-12 py-3 text-base sm:text-lg">
              {item.answer}
            </p>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>
<div className='mt-15'>

</div>
<Footer/>

    </div>
  )
}

export default About
