'use client'
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useProjects } from "../context/ProjectsContext";
import { useRouter } from "next/navigation";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Project = () => {
  const { projects, loading, fetchProjects } = useProjects();

  
    const router = useRouter(); // 👈 router
     const handleReadMore = (id) => {
    router.push(`/project/${id}`); // 👈 push to dynamic page
  };

  useEffect(() => {
    fetchProjects()
  }, [])
  

  return (
    <div className="py-5 max-md:mt-20">
      <div className="main-container ">
        {/* ---------- HEADER SECTION ---------- */}
        <div className="flex flex-col md:px-5 lg:flex-row items-start lg:items-center justify-between w-full md:mb-16 mb-8">
          <div className="flex flex-col mb-6 lg:mb-0">
            <p className="bg-[#fad8bbb7] text-[#ff963a] mb-5 w-30 h-7 flex justify-center items-center text-sm font-semibold rounded">
              OUR PROJECTS
            </p>

            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-jakarta leading-snug">
              Explore our latest <br /> solar projects
            </h1>
          </div>

          <p className="text-gray-600 text-sm sm:text-md md:text-lg w-full lg:w-1/2 text-left lg:text-right">
            At Mentary, we believe in the power of renewable energy to create a
            more sustainable future. With a passion for clean energy and a
            commitment to our customers, we are dedicated to delivering the best
            possible solutions.
          </p>
        </div>

        {/* ---------- SWIPER PROJECT SLIDER ---------- */}
      </div>
       <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={0}
  slidesPerView={4}
  loop={true}
  className="mySwiper mb-15"
  breakpoints={{
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
>
  {projects.map((p, i) => (
    <SwiperSlide key={i}>
      <div className="relative group overflow-hidden cursor-pointer">

        {/* IMAGE */}
        <img
          src={p.images?.[0] || "/placeholder.jpg"}
          width={500}
          height={300}
          alt={p.title}
          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* BLACK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

        {/* TEXT + BUTTON */}
        <div
          className="
            absolute bottom-0 left-0 w-full p-5
            transition-all duration-500
            translate-y-[60px] group-hover:translate-y-0
            max-md:translate-y-0
          "
        >
          <h2 className="text-white text-xl font-semibold">{p.title}</h2>
          <p className="text-[#f2801c] text-sm mb-3">{p.type}</p>

         <button
                  onClick={() => handleReadMore(p._id)} // 👈 navigate to project page
                  className="px-5 py-2 bg-[#f2801c] text-white font-semibold text-sm rounded shadow"
                >
                  Read More →
                </button>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


      {loading && (
        <p className="text-center text-gray-400 mt-4">
          Loading latest projects...
        </p>
      )}
    </div>
  );
};

export default Project;
