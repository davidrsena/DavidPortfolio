import React, { useState, useEffect } from "react";
import '../index.css';

const images = [
  require("../imgs/about3.jpeg"),
  require("../imgs/about2.jpeg"),
  require("../imgs/about1.jpg"),
];

const Personal = ({ setPage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const changePage = (e) => {
    e.preventDefault();
    setPage("Projects");
  };

  return (
    <div className="container mt-5 gap-2" style={{ maxWidth: "1500px" }}>
      <div className="row mt-5">
        <div className="col-lg-5 col-md-12">
          <div className="image-container">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="img-cover"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="col-lg-7 col-md-12">
          <h1 className="fw-bold">Hi there. I'm David.</h1>
          <p className="mt-2 text-justify font-weight-light">
            About four years ago, I chose to realign my career toward technology and completed a Bachelor's degree in Multimedia and Communication Technologies, specializing in web development.</p>
            <br /> Since then, I have built a solid foundation across the entire digital product lifecycle — from gathering requirements and prototyping in Figma to implementing solutions with HTML, CSS, JavaScript, PHP, SQL, and React.
            <br />Beyond technical expertise, my background as a musician and active member of PostLab, a cultural association, has shaped the way I work with people. I value clear communication, adaptability, and creative collaboration, and thrive in environments where different perspectives come together to build stronger solutions.
            <br /> <br /> I approach learning with the belief that if a group of people can master a task, with time and effort, I can too. This mindset drives me to continuously grow, adapt, and contribute meaningfully to any team.
            <br />

            <h3> I am excited to join a collaborative, forward-thinking team where I can continue to develop my skills and help create impactful digital experiences. </h3>

            <button
              className="personal-button text-white text-decoration-none bg-black p-4 border-0"
              onClick={changePage}
            >
              Let me introduce you to my work
              <i className="ms-2 bi bi-chevron-right"></i>
            </button>

        </div>
      </div>
    </div>
  );
};

export default Personal;
