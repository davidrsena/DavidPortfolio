import React, { useState, useEffect } from "react";
import { useFirebase } from "./FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
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
      <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap" style={{ marginTop: "80px" }}>
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
          className="projects-container container mt-5"
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
    {/* Image */}
    {project.Imgs?.[0] && (
      <img
        src={adjustImageUrl(project.Imgs[0])}
        alt={project.Title || "Project Image"}
        className="img-cover"
      />
    )}

    {/* Desktop View (Mask, Title, Synopsis, Button) */}
    <div className="mask d-none d-md-block">
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

    {/* Mobile-only Section */}
    <div className="container d-block d-md-none mt-1 text-center">
      <div className=" align-items-center">
        
        {/* Button */}
        <button
          className="mx-auto border bg-white py-2 px-5 mb-2 row"
          onClick={() => {
            setSelectedProject(project);
            setPage("ProjectDetails");
          }}
        >
          More info {project.Title}
        </button>
      </div>
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
