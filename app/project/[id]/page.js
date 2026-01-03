'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjects } from "@/app/context/ProjectsContext";
import { Loader2, Zap, MapPin, Activity, Youtube } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Topbar from "@/app/components/topbar";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Project from "@/app/components/project-section";
import Testimonial from "@/app/components/testimonial-sections";

const ProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { projects, loading } = useProjects();
  const [project, setProject] = useState(null);

  useEffect(() => {
    console.log(projects);
    
    if (!loading && projects.length > 0) {
      const found = projects.find((p) => p._id === id);
      if (!found) {
        router.push("/"); // agar project na mile to homepage
      } else {
        setProject(found);
      }
    }
  }, [loading, projects, id, router]);

  if (loading || !project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#f2801c]" />
      </div>
    );
  }

  return (
    <>
    <Topbar/>
    <Navbar/>
    <div className="main-container py-10">
      {/* ---------- IMAGE GALLERY SLIDER ---------- */}
      <Swiper
        modules={[ Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className="mb-10 rounded-lg overflow-hidden shadow-lg"
      >
        {project.images?.map((img, i) => (
          <SwiperSlide key={i}>
  <img
    src={img || "/placeholder.jpg"}
    alt={`${project.title} - ${i}`}
    className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover rounded-lg"
  />
</SwiperSlide>

        ))}
      </Swiper>

      {/* ---------- PROJECT INFO ---------- */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {project.title}
          </h1>
          <p className="text-[#f2801c] font-semibold text-lg">{project.type} Project</p>

          <div className="flex flex-wrap gap-6 mt-2 text-gray-600">
            <p className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> {project.capacity} kW
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" /> {project.location}
            </p>
            <p className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" /> {project.status}
            </p>
          </div>

          <p className="text-gray-700 mt-4 leading-relaxed">{project.shortDescription}</p>

          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-[#f2801c] text-white rounded-lg font-semibold shadow hover:brightness-105 transition"
            >
              <Youtube className="w-5 h-5" /> Watch Video
            </a>
          )}
        </div>

        {/* Right: Optional extra info / features */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Placeholder for additional project details */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Project Details</h2>
            <ul className="text-gray-600 space-y-2">
              <li><span className="font-semibold">Type:</span> {project.type}</li>
              <li><span className="font-semibold">Capacity:</span> {project.capacity} kW</li>
              <li><span className="font-semibold">Location:</span> {project.location}</li>
              <li><span className="font-semibold">Status:</span> {project.status}</li>
              <li><span className="font-semibold">YouTube:</span> {project.youtubeLink ? "Available" : "Not Provided"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Project/>
    <Testimonial/>
    <div className="mt-15"></div>
    <Footer/>
    </>
  );
};

export default ProjectPage;
