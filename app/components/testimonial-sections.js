'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      img: "/author-1.jpg",
      name: "John Doe",
      profession: "Web Developer",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too ",
    },
    {
      img: "/author-2.jpg",
      name: "Jane Smith",
      profession: "Graphic Designer",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too ",
    },
    {
      img: "/author-3.jpg",
      name: "Michael Johnson",
      profession: "Entrepreneur",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too ",
    },
    {
      img: "/author-4.jpg",
      name: "Sarah Williams",
      profession: "Marketing Expert",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too ",
    },
    {
      img: "/author-1.jpg",
      name: "David Brown",
      profession: "Software Engineer",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too "
    },
    {
      img: "/author-2.jpg",
      name: "Emily Davis",
      profession: "Content Creator",
      feedback: "For adding learning references, it's really good, because clients often study here too For adding learning references, it's really good, because clients often study here too ",
    },
  ];

  return (
    <div className="py-10 ">
      <div className="main-container pb-10 flex flex-col lg:flex-row justify-between items-start mb-10 gap-5">
        {/* ---------- HEADER SECTION ---------- */}
        <div className="flex flex-col mb-6 lg:mb-0">
          <p className="bg-[#fad8bbb7] text-[#ff963a] mb-5 w-30 h-7 flex justify-center items-center text-sm font-semibold rounded">
            TESTIMONIAL
          </p>

          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-jakarta leading-snug">
            Our customers give <br /> love feedback
          </h1>
        </div>

        <p className="text-gray-600 text-sm sm:text-md md:text-lg w-full lg:w-1/2 text-left lg:text-right">
          At Mentary, we believe in the power of renewable energy to create a
          more sustainable future. With a passion for clean energy and a
          commitment to our customers, we are dedicated to delivering the best
          possible solutions.
        </p>
      </div>

      {/* ---------- SWIPER TESTIMONIAL SLIDER ---------- */}
      <div className="px-7 md:px-16 ">
     <Swiper
  modules={[]} // Pagination module remove
  spaceBetween={50}
  slidesPerView={3}
  loop={true}
  breakpoints={{
    0: { slidesPerView: 1 },
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="mySwiper main-container "
>
  {testimonials.map((t, i) => (
    <SwiperSlide key={i}>
      <div className="relative group cursor-pointer choose-border overflow-hidden bg-white transition-all duration-500  flex flex-col h-72">
        
        {/* BACKGROUND SLIDE EFFECT */}
        <div className="absolute inset-0 bg-[#f2801c] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full justify-between max-md:p-4 p-10">
          {/* TOP SECTION: IMAGE + NAME/PROFESSION */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover "
            />

            <div className="flex flex-col">
              <h3 className="text-xl font-semibold group-hover:text-white">{t.name}</h3>
              <p className="text-sm text-[#f2801c] group-hover:text-white">{t.profession}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 group-hover:text-white text-md">
            {t.feedback}
          </p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>



    </div>
  );
};

export default Testimonial;
