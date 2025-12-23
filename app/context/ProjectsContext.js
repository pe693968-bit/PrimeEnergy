'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      title: "Adani Plant - Gujarat",
      type: "Power Plant",
      img: "/project-1.jpg",
    },
    {
      title: "Goldi Plant - Gujarat",
      type: "Solar Plant",
      img: "/project-2.jpg",
    },
    {
      title: "Adani Plant - Gujarat",
      type: "Mega Plant",
      img: "/project-3.jpg",
    },
    {
      title: "Tata Plant - Gujarat",
      type: "Power Plant",
      img: "/project-4.jpg",
    },
  ]); // Initial placeholder data

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
