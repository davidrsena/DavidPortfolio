import React, { useState, useEffect } from "react";
import { FirebaseProvider } from "./components/FirebaseContext";

import Navbar from "./components/Navbar";  
import Personal from "./components/Personal";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from "framer-motion";
import './index.css';

const App = () => {
  const [page, setPage] = useState("Personal");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const hasShown = sessionStorage.getItem("hasShownWelcome");

    console.log("🧭 Navigation type:", navType);

    if (navType === "reload" && !hasShown) {
      console.log("Showing welcome screen");
      setShowWelcome(true);
      sessionStorage.setItem("hasShownWelcome", "true");
    } else {
      console.log("Skipping welcome screen");
    }
  }, []);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <FirebaseProvider>
        <Navbar page={page} setPage={setPage} />

        <div className="flex-grow-1 mx-5 mt-3 row">
          <AnimatePresence mode="wait">
            {page === "Personal" && (
              <Personal
                key="personal"
                setPage={setPage}
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            )}
            {page === "Projects" && (
              <Projects 
                key="projects" 
                setPage={setPage} 
                setSelectedProject={setSelectedProject} 
              />
            )}
            {page === "ProjectDetails" && (
              <ProjectDetails 
                key="projectDetails" 
                setPage={setPage} 
                selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject}
              />
            )}
          </AnimatePresence>
        </div>
      </FirebaseProvider>
      <Footer/>
    </div>
  );
};

export default App;
