import React, { useState, useEffect } from "react";
import { useFirebase } from "./FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { motion} from "framer-motion";
import "../index.css";

const Projects = ({ setPage, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const { firestore } = useFirebase();

  const categories = ["all", "web", "audio", "visual"];

  const handleCategoryClick = (type) => {
    if (type === "all") {
      setSelectedCategories(["all"]);
    } else {
      let updated = [...selectedCategories];
      if (updated.includes(type)) {
        updated = updated.filter((cat) => cat !== type);
      } else {
        updated = updated.filter((cat) => cat !== "all");
        updated.push(type);
      }
      if (updated.length === 0) updated = ["all"];
      setSelectedCategories(updated);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const collectionsMap = {
          web: "Projetos",
          audio: "Audios",
          visual: "Visuals",
        };

        let allProjects = [];

        const selected = selectedCategories.includes("all")
          ? Object.keys(collectionsMap)
          : selectedCategories;

        for (let type of selected) {
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

        setProjects(allProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [firestore, selectedCategories]);

  const adjustImageUrl = (url) => {
    return url.includes("dropbox.com") ? url.replace("dl=0", "dl=1") : url;
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="d-flex justify-content-center align-items-center my-5 gap-3 flex-wrap">
        {categories.map((type) => (
          <button
            key={type}
            onClick={() => handleCategoryClick(type)}
            className={`projects-button text-decoration-none border-rounded py-2 px-4 ${
              selectedCategories.includes(type) ? "active-category" : ""
            }`}
            style={{ border: "none", cursor: "pointer" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

  
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <div className="spinner-border text-dark" role="status" />
        </div>
      ) : (
        <motion.div
          className="projects-container container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="row g-5">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                  <motion.div
                    className="fall-item fall-effect"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {project.Imgs?.[0] && (
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
                        className="mask-button py-2 px-4"
                        onClick={() => {
                          setSelectedProject(project);
                          setPage("ProjectDetails");
                        }}
                      >
                        More info
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <h2>Under construction...</h2>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
