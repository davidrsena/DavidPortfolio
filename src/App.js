import React, { useState } from "react";
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

  return (
    <div>
      <FirebaseProvider>
      <Navbar page={page} setPage={setPage} />

        <div className="mx-5 mt-5 row">
          <AnimatePresence mode="wait">
            {page === "Personal" && <Personal key="personal" setPage={setPage} />}
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
