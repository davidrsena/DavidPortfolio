import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "./FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import "../index.css";

const techIcons = {
  js: "js.png",
  html: "html.png",
  css: "css.png",
  bootstrap: "bootstrap.png",
  react: "react.png",
  firebase: "firebase.png",
  php: "php.png",
  angular: "angular.png",
  sql: "sql.png",
  vue: "vue.png",
};

const ProjectDetails = ({ setPage, selectedProject, setSelectedProject }) => {
  const { firestore } = useFirebase();
  const [projects, setProjects] = useState([]);
  const [hasError, setHasError] = useState(false); // Error state to manage button visibility

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const collectionsMap = {
          web: "Projetos",
          audio: "Audios",
          visual: "Visuals",
        };

        let allProjects = [];
        for (let collectionName of Object.values(collectionsMap)) {
          const projectsRef = collection(firestore, collectionName);
          const querySnapshot = await getDocs(projectsRef);
          querySnapshot.docs.forEach((doc) =>
            allProjects.push({
              id: parseInt(doc.id),
              ...doc.data(),
              collectionName,
            })
          );
        }

        allProjects.sort((a, b) => a.id - b.id);
        setProjects(allProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setHasError(true); // Set error state if fetching fails
      }
    };

    fetchProjects();
  }, [firestore]);

  if (!selectedProject || projects.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-dark" role="status" />
      </div>
    );
  }

  const currentIndex = projects.findIndex((proj) => proj.id === selectedProject.id);
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  const adjustImageUrl = (url) => {
    if (url.includes("dropbox.com")) {
      return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }
    return url;
  };

  return (
    <motion.div
  className="mt-5 position-relative"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
      {/* Top back button */}
      <div className="d-flex">
        <button
          className="text-decoration-none py-1 border-0 bg-transparent"
          onClick={() => setPage("Projects")}
        >
          <i className="bi bi-chevron-left fs-6 mx-2"></i>Back to <b className="hover-Projects">Projects.</b>
        </button>
      </div>

      {/* Arrows */}
      <div className="d-flex justify-content-between d-md-none mt-4">
        <button
          className="border-0 bg-transparent"
          onClick={() => setSelectedProject(projects[prevIndex])}
        >
          <i className="bi bi-chevron-left fs-1"></i>
        </button>

        <button
          className="border-0 bg-transparent"
          onClick={() => setSelectedProject(projects[nextIndex])}
        >
          <i className="bi bi-chevron-right fs-1"></i>
        </button>
      </div>

      <div className="container mt-4 position-relative">
        <div className="row g-4 align-items-start"> {/* Align items from the top */}
          {/* Left Arrow (only large screens) */}
          <div className="col-1 d-none d-md-flex justify-content-center">
            <button
              className="border-0 bg-transparent"
              onClick={() => setSelectedProject(projects[prevIndex])}
            >
              <i className="bi bi-chevron-left fs-1"></i>
            </button>
          </div>

          {/* Image */}
          <div className="col-12 col-md-6 project-image">
            <div className="w-100 d-flex justify-content-center">
              {selectedProject.Imgs && selectedProject.Imgs.length > 0 ? (
                <img
                  src={adjustImageUrl(selectedProject.Imgs[0])}
                  alt={selectedProject.Title || "Project Image"}
                  className="img-fluid rounded"
                />
              ) : (
                <p className="text-white">No image available</p>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="col-12 col-md-4 project-text">
            <h1 className="fw-bold">
              {selectedProject.Title}
              {selectedProject.Github && (
                <a href={selectedProject.Github} target="_blank" rel="noopener noreferrer" className="mx-3">
                  <i className="bi bi-github fs-2"></i>
                </a>
              )}
              {selectedProject.Youtube && (
                <a href={selectedProject.Youtube} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube fs-1"></i>
                </a>
              )}
            </h1>

            <h5 className="mt-3 fw-medium">Applied Technologies</h5>
            <div className="d-flex flex-wrap mt-2 gap-2">
              {selectedProject.AppliedTech && selectedProject.AppliedTech.length > 0 ? (
                selectedProject.AppliedTech.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="d-flex align-items-center"
                  >
                    {techIcons[tech.toLowerCase()] ? (
                      <img
                        src={`icons/${techIcons[tech.toLowerCase()]}`}
                        alt={tech}
                        className="icon-size"
                      />
                    ) : (
                      <i className={`bi bi-${tech.toLowerCase()} fs-4`}></i>
                    )}
                  </motion.div>
                ))
              ) : (
                <p>No technologies listed.</p>
              )}
            </div>

            <h5 className="mt-4 fw-medium">Synopsis</h5>
            <p className="text-justify font-weight-light">{selectedProject.SynopsisFull}</p>

            <h5 className="mt-4 fw-medium">My Role</h5>
            <p className="text-justify font-weight-light">{selectedProject.MyRole}</p>
          </div>

          {/* Right Arrow (only large screens) */}
          <div className="col-1 d-none d-md-flex justify-content-center">
            <button
              className="border-0 bg-transparent"
              onClick={() => setSelectedProject(projects[nextIndex])}
            >
              <i className="bi bi-chevron-right fs-1"></i>
            </button>
          </div>
        </div>

        {/* Show "Back to Projects" button only if an error occurred */}
        {hasError && (
          <div className="text-center mt-4">
            <button
              className="personal-button text-white text-decoration-none bg-black p-4 border-0"
              onClick={() => setPage("Projects")}
            >
              Back to Projects
              <i className="ms-2 bi bi-chevron-right"></i>
            </button>
            <h1>Oops! Something went wrong.</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
