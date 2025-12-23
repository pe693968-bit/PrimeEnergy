import Hero from "./components/hero-section";
import Navbar from "./components/navbar";
import Topbar from "./components/topbar";

import Image from "next/image";
import About from "./components/about-section";
import Service from "./components/service-section";
import Choose from "./components/choose-section";
import { Play, MessageCircle } from "lucide-react";
import Project from "./components/project-section";
import Testimonial from "./components/testimonial-sections";
import CustomCursor from "./components/cursor";
import FaqSection from "./components/faq-section";
import Footer from "./components/footer";



export default function Home() {
  return (
    <>
    <CustomCursor />
      <Topbar/>
      <Navbar/>
    <div className="main w-full ">
      <Hero/>
      
    </div>
<About/>
<Service/>
<Choose/>




{/* video section --------------------  */}




<div className="relative bg-black h-[80vh] w-full overflow-hidden flex items-center justify-center group">
  <img
    src="video-bg.jpg"
    alt=""
    className="bg-img absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out"
  />

  {/* SHINE EFFECT */}
  <div className="shine absolute inset-0 pointer-events-none"></div>

  {/* PLAY BUTTON */}
  <div className="relative z-10">
    <div className="play-btn relative flex items-center justify-center w-24 h-24 rounded-full bg-[#f2801c] text-white cursor-pointer">
      
      {/* Lucide Play Icon */}
      <Play size={40} />

      {/* Waves */}
      <span className="wave absolute inset-0 rounded-full"></span>
      <span className="wave2 absolute inset-0 rounded-full"></span>
      <span className="wave3 absolute inset-0 rounded-full"></span>
    </div>
  </div>
</div>


<Project/>
<Testimonial/>

<div className="my-15 max-md:mx-10">


<div className="bg-[#f2801c] text-white py-16  main-container  px-8 rounded-3xl text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Need Bulk Orders?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Get special pricing and priority delivery for large quantities
          </p>
          <a
            href={`https://wa.me/923111800222?text=${encodeURIComponent(
    "Hello, I'm interested in a bulk order."
  )}`}
            target="_blank"
            className="inline-flex items-center gap-3 max-md:px-6 font-jakarta max-md:py-3 px-10 py-5 bg-white text-[#f2801c] rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition"
          >
            <MessageCircle className="w-6 h-6" /> Chat on WhatsApp Now
          </a>
        </div>
        </div>
        <FaqSection/>
<Footer/>






  
    
    </>
  );
}
