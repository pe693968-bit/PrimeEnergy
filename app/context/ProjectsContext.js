'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/projects", {
          cache: "no-store", // Prevent stale cache issues
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        console.log(data);
        
        setProjects(data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error("Fetch projects error:", err);
      } 
    };


      useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
