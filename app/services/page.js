'use client'
import React from 'react'
import Navbar from '../components/navbar'
import Topbar from '../components/topbar'
import { Image } from 'lucide-react'
import Footer from '../components/footer'
import { ArrowUpRight } from "lucide-react";
import { ArrowRight } from 'lucide-react'
import Testimonial from '../components/testimonial-sections'
import FaqSection from '../components/faq-section'
import Project from '../components/project-section'
import ContactForm from '../components/service-contact'
import PricingSection from '../components/pricing'
const services = [
  {
    title: "Solar Panel Installation",
    desc: "Fast, safe, and certified installation by experienced technicians.",
    image: "/service1.jpg",
  },
  {
    title: "Solar Panel Maintenance",
    desc: "Ensure peak performance with regular inspections and cleaning.",
    image: "/service2.jpg",
  },
  {
    title: "Custom System Design",
    desc: "We create efficient solar setups tailored to your energy goals.",
    image: "/service3.jpg",
  },
  {
    title: "Solar Battery Storage",
    desc: "Capture and store surplus solar energy for use anytime, even during outages.",
    image: "/service4.jpg",
  },
  {
    title: "System Monitoring ",
    desc: "Track performance in real time and get detailed system health reports.",
    image: "/service5.jpg",
  },
  {
    title: "Solar Panel Upgrades",
    desc: "Boost energy output and efficiency with the latest panel technology.",
    image: "/service6.jpg",
  },
];

const Service = () => {
  return (
    <>
    <Topbar/>
    <Navbar/>
    <div
  className="relative  w-full h-[70vh] py-32 bg-cover bg-fixed bg-center flex items-center justify-center"
  style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  <div className='w-8 h-8 bg-white absolute bottom-0 right-8'></div>
  <div className='w-8 h-8 bg-white absolute bottom-8 right-0'></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
    
    {/* Breadcrumb */}
    <div className="flex bg-[#f2801c] p-2 px-3 rounded-2xl items-center gap-2 text-sm text-white mb-4">
      <span className="hover:text-white font-semibold cursor-pointer transition">Home</span>
      <span className="opacity-60">/</span>
      <span className="text-[white] font-semibold">Services</span>
    </div>

    {/* Title */}
    <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight font-jakarta">
      Our Services
    </h1>

    {/* Optional Subtitle (agar chaho) */}
    <p className="text-gray-200 font-jakarta text-base sm:text-md mt-4 max-w-2xl">
  Discover our professional solar and renewable energy services, delivering
  efficient, reliable, and cost-effective solutions for residential,
  <br className='max-md:hidden' /> commercial, and industrial needs.
</p>


  </div>
</div>

 <section className="max-w-7xl mx-auto mt-2 px-6 py-20 font-jakarta">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-25">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative rounded-2xl  bg-white shadow-lg"
          >
            {/* IMAGE */}
            <div className="relative h-86 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={service.image}
                alt={service.title}
                width={'100%'}
                height={'100%'}
                className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 shadow-lg rounded-2xl max-w-[90%] w-full p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>

              {/* ARROW BUTTON */}
               <button
    onClick={() => {
      const section = document.getElementById("contact");
      section?.scrollIntoView({ behavior: "smooth" });
    }}
    className="absolute cursor-pointer -top-6 right-5 w-12 h-12 bg-[#f2801c] rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-45"
  >
    <ArrowUpRight className="text-white" />
  </button>
            </div>
          </div>
        ))}
      </div>
    </section>


<div
  className="relative mt-10 mb-15 w-full min-h-[90%] py-15 bg-cover bg-fixed bg-center flex items-center justify-center"
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
      Lets talk to us today
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
      <a href="/contact">
      <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
                  <p className="z-10 font-jakarta">Get Started</p>
                  <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </button>
      </a>
    </div>
  </div>
</div>


<Project/>
<ContactForm/>
<PricingSection/>
<FaqSection/>
<Footer/>
    </>
  )
}

export default Service
