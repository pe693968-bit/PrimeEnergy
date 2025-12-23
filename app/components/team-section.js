'use client'
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Loader2 } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error("Failed to fetch team");
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="py-5">
      <div className="main-container pt-15">
        {/* ---------- HEADER SECTION ---------- */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full md:mb-16 mb-8">
          <div className="flex flex-col mb-6 lg:mb-0">
            <p className="bg-[#fad8bbb7] text-[#ff963a] mb-5 w-30 h-7 flex justify-center items-center text-sm font-semibold rounded">
              OUR TEAM
            </p>

            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-jakarta leading-snug">
              Meet our dedicated <br /> team members
            </h1>
          </div>

          <p className="text-gray-600 text-sm sm:text-md md:text-lg w-full lg:w-1/2 text-left lg:text-right">
            Our team is committed to delivering high-quality solar energy solutions. We work together with passion, expertise, and dedication to create sustainable energy solutions for our clients.
          </p>
        </div>

        {/* ---------- SWIPER TEAM SLIDER ---------- */}
        {loading ? (
          <p className="text-center text-gray-400 mt-4 flex justify-center items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading team...
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
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
            {team.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="relative group overflow-hidden cursor-pointer rounded-lg shadow-lg border border-gray-100">
                  {/* IMAGE */}
                  <img
                    src={member.image || "/placeholder.jpg"}
                    alt={member.name}
                    className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* BLACK GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                  {/* TEXT */}
                  <div
                    className="
                      absolute bottom-0 left-0 w-full p-5
                      transition-all duration-500
                      translate-y-[60px] group-hover:translate-y-0
                      max-md:translate-y-0
                    "
                  >
                    <h2 className="text-white text-xl font-semibold">{member.name}</h2>
                    <p className="text-[#f2801c] text-sm mb-3">{member.profession}</p>
                    <p className="text-white text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {member.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TeamSection;
