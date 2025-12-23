"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const faqs = [
  {
    id: "01",
    question: "What is Solar Energy?",
    answer:
      "Solar Energy refers to the energy obtained from the sun through the use of photovoltaic cells or solar panels.",
  },
  {
    id: "02",
    question: "How does Solar Energy work?",
    answer:
      "Solar energy works by converting sunlight into electricity using solar panels installed on rooftops or open fields.",
  },
  {
    id: "03",
    question: "What is Renewable Energy?",
    answer:
      "Renewable energy comes from natural resources that replenish themselves such as sunlight, wind, rain, and geothermal heat.",
  },
  {
    id: "04",
    question: "I have a bigger project. Can you handle it?",
    answer:
      "Yes, we provide full-scale solar solutions designed for homes, businesses, and large commercial projects.",
  },
  {
    id: "05",
    question: "How do you communicate?",
    answer:
      "We communicate through phone calls, emails, WhatsApp, and on-site meetings depending on your preference.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const refs = useRef([]);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

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
<section className="bg-[#f9b48031] py-20 md:py-24 mt-15 px-4 md:px-20">
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
      <span className="text-[10px] md:text-xs tracking-widest font-semibold px-3 py-1 text-[#f2801c] bg-[#fdd1aa94] rounded-md">
        FREQUENTLY ASKED QUESTIONS
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
        Everything you need to know  
        
        about our services solutions
      </h2>
    </div>

    {/* RIGHT SIDE ACCORDION */}
    <div className="p-2 sm:p-4 md:p-8">
      {faqs.map((item, index) => (
        <div key={index} className="border-b  border-gray-300 py-4 sm:py-6">
          
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-start cursor-pointer justify-between text-left group gap-3"
          >
            <div className="flex items-start gap-3 sm:gap-5">
              <span
                className={`text-lg sm:text-xl font-bold ${
                  open === index ? "text-[#f2801c]" : "text-gray-700"
                }`}
              >
                {item.id}
              </span>

              <span
                className={`
                  text-lg sm:text-xl font-medium 
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

  );
}
