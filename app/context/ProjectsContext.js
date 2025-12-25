'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent setting state if component unmounts

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/projects", {
          cache: "no-store", // Prevent stale cache issues
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        if (isMounted) setProjects(data);
      } catch (err) {
        if (isMounted) setError(err.message);
        console.error("Fetch projects error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
