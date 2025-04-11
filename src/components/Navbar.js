import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const Navbar = ({ page, setPage }) => {
  return (
    <nav className="mx-auto navbar navbar-Width navbar-expand-lg navbar-light fixed-top mb-5 border-bottom border-dark">
      <div className="mx-5 container-fluid">

        <a
          className='fw-bold text-decoration-none pr-5 navbar-brand'
          href="#home"
          onClick={() => setPage("Personal")}
        >
          David's Portfolio.
        </a>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav fw-semibold w-100">
    {/* "About" link on small screens */}
    <li className="nav-item d-lg-none w-100">
      <a
        className={`navbar-text nav-link ${page === "Personal" ? "active-tab" : ""}`}
        href="#about"
        onClick={() => setPage("Personal")}
        style={{ textAlign: 'right' }}  // Right align "About" on small screens only
      >
        About.
      </a>
    </li>
    {/* "Projects" link on small screens */}
    <li className="nav-item d-lg-none w-100">
      <a
        className={`navbar-text nav-link ${page === "Projects" || page === "ProjectDetails" ? "active-tab" : ""}`}
        href="#projects"
        onClick={() => setPage("Projects")}
        style={{ textAlign: 'right' }}  // Right align "Projects" on small screens only
      >
        Projects.
      </a>
    </li>

    {/* "About" and "Projects" links on large screens */}
    <li className="nav-item d-none d-lg-block">
      <a
        className={`navbar-text nav-link ${page === "Personal" ? "active-tab" : ""}`}
        href="#about"
        onClick={() => setPage("Personal")}
      >
        About.
      </a>
    </li>
    <li className="nav-item d-none d-lg-block">
      <a
        className={`navbar-text nav-link ${page === "Projects" || page === "ProjectDetails" ? "active-tab" : ""}`}
        href="#projects"
        onClick={() => setPage("Projects")}
      >
        Projects.
      </a>
    </li>
  </ul>

  {/* Social Links for large screens */}
  <div className="d-none d-lg-flex fw-bold fs-4 gap-3 ms-auto">
    <a
      href="https://github.com/davidrsena"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-icon me-3 text-dark text-decoration-none"
    >
      <i className="bi bi-github"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/david-sena/"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-icon me-3 text-dark text-decoration-none"
    >
      <i className="bi bi-linkedin"></i>
    </a>
    <a
      href="mailto:dvd.sena1@gmail.com"
      className="navbar-icon text-dark text-decoration-none"
    >
      <i className="me-3 bi bi-envelope"></i>
    </a>
  </div>

  {/* Social Links for small screens (Burger Menu) */}
  <div className="fw-bold fs-4 gap-3 ms-auto d-lg-none d-flex justify-content-end w-100">
    <a
      href="https://github.com/davidrsena"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-icon me-3 text-dark text-decoration-none"
    >
      <i className="bi bi-github"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/david-sena/"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-icon me-3 text-dark text-decoration-none"
    >
      <i className="bi bi-linkedin"></i>
    </a>
    <a
      href="mailto:dvd.sena1@gmail.com"
      className="navbar-icon text-dark text-decoration-none"
    >
      <i className="me-3 bi bi-envelope"></i>
    </a>
  </div>
</div>



      </div>
    </nav>
  );
};

export default Navbar;
