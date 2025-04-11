import React, { useState, useEffect } from "react";
import { useFirebase } from "./FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "../index.css";

const Projects = ({ setPage, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const { firestore } = useFirebase();

  const categories = ["all", "web", "audio", "visual"];

  const handleCategoryClick = (type) => {
    // Toggle logic for multi-select
    if (type === "all") {
      setSelectedCategories(["all"]);
    } else {
      let updated = [...selectedCategories];
      if (updated.includes(type)) {
        updated = updated.filter((cat) => cat !== type);
      } else {
        updated = updated.filter((cat) => cat !== "all"); // Remove "all" if selecting specific ones
        updated.push(type);
      }
      if (updated.length === 0) updated = ["all"]; // Reset to "all" if empty
      setSelectedCategories(updated);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const collectionsMap = {
          web: "Projetos",
          audio: "Audios",
          visual: "Visuals",
        };

        let allProjects = [];

        if (selectedCategories.includes("all")) {
          const allCollections = Object.values(collectionsMap);
          for (let collectionName of allCollections) {
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
        } else {
          for (let type of selectedCategories) {
            const collectionName = collectionsMap[type];
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
        }

        setProjects(allProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
  }, [firestore, selectedCategories]);

  const adjustImageUrl = (url) => {
    if (url.includes("dropbox.com")) {
      return url.replace("dl=0", "dl=1");
    }
    return url;
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center my-5 gap-3">
        {categories.map((type) => (
          <button
            key={type}
            onClick={() => handleCategoryClick(type)}
            className={`d-inline-flex align-items-center justify-content-center hover-overlay-css projects-button text-decoration-none border-rounded py-2 px-4 ${
              selectedCategories.includes(type) ? "active-category" : ""
            }`}
            style={{ border: "none", cursor: "pointer" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="projects-container container">
        <motion.div
          className="container"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6 }}
        >
          <div className="row g-5">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                  <div className="fall-item fall-effect">
                    {project.Imgs && project.Imgs.length > 0 && (
                      <img
                        src={adjustImageUrl(project.Imgs[0])}
                        alt={project.Title || "Project Image"}
                        className="img-cover"
                      />
                    )}
                    <div className="mask">
                      <h3 className="mt-2">{project.Title}</h3>
                      <p className="mt-2">{project.Synopsis}</p>
                      <button
                        className="d-inline-flex align-items-center justify-content-center mask-button text-decoration-none py-2 px-4"
                        onClick={() => {
                          setSelectedProject(project);
                          setPage("ProjectDetails");
                        }}
                      >
                        More info
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <h2>Under construction...</h2>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
