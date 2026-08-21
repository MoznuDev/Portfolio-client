import { useState } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaFolder,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../../redux/features/project/projectApi";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);

  // Redux থেকে প্রজেক্ট ডাটা ফেচ করা
  const { data: response, isLoading, isError } = useGetProjectsQuery();

  if (isLoading) {
    return <div className="projects-loading">Loading Projects...</div>;
  }

  if (isError) {
    return <div className="projects-error">Failed to load projects.</div>;
  }

  // ডাটা স্ট্রাকচার সেফলি হ্যান্ডেল করা
  const rawData = response?.data || response?.projects || response;
  const projectsList = Array.isArray(rawData) ? rawData : [];

  // ক্যাটাগরি ফিল্টারিং লজিক
  const categories = [
    "All Projects",
    ...new Set(projectsList.map((project) => project.category).filter(Boolean)),
  ];

  // একটিভ ক্যাটাগরি অনুযায়ী ফিল্টার করা প্রজেক্ট তালিকা
  const categoryFiltered =
    activeCategory === "All Projects"
      ? projectsList
      : projectsList.filter((project) => project.category === activeCategory);

  // showAll true হলে সব দেখাবে, নাহলে প্রথম ৬টি দেখাবে
  const filteredProjects = showAll
    ? categoryFiltered
    : categoryFiltered.slice(0, 6);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-badge">
            <span className="bracket top-left">┌</span>
            <span className="badge-text">My Awesome Work</span>
            <span className="bracket bottom-right">┘</span>
          </div>
          <h2 className="projects-main-title">My Recent Works</h2>
        </div>

        {/* Dynamic Category Filter Buttons */}
        {categories.length > 1 && (
          <div className="projects-filter-buttons">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false); // ক্যাটাগরি পাল্টালে আবার প্রথম ৬টিতে রিসেট হবে
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className="no-projects-found"
            style={{ textAlign: "center", padding: "3rem 0", color: "#9ca3af" }}
          >
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {filteredProjects.map((project, index) => {
                // প্রজেক্ট আইডি
                const projectId = project?._id || project?.id;

                // ব্যাকএন্ডের বিভিন্ন ফিল্ড নেম সাপোর্ট
                const imageUrl =
                  project?.projectImage || project?.image || project?.thumbnail;
                const liveUrl =
                  project?.liveUrl || project?.liveLink || project?.live;
                const githubClient =
                  project?.githubClient || project?.githubLink;
                const githubServer = project?.githubServer;

                // সেফ রেটিং ও রিভিউ সংখ্যা গণনার লজিক
                const reviews = Array.isArray(project?.reviews)
                  ? project.reviews
                  : [];
                const totalReviews =
                  reviews.length > 0
                    ? reviews.length
                    : Number(project?.numReviews) || 0;

                const avgRating =
                  reviews.length > 0
                    ? (
                        reviews.reduce(
                          (acc, curr) => acc + (Number(curr.rating) || 0),
                          0,
                        ) / reviews.length
                      ).toFixed(1)
                    : Number(project?.rating || 0).toFixed(1);

                return (
                  <div
                    className="project-card"
                    key={projectId || project?.slug || index}
                  >
                    {/* Folder Header Shape & Image Area */}
                    <div className="project-folder-wrapper">
                      <div className="folder-tab"></div>

                      <div className="project-image-container relative cursor-pointer">
                        {/* ছবিতে ক্লিক করলে সিঙ্গেল প্রজেক্ট পেজে নিয়ে যাবে */}
                        <Link to={projectId ? `/projects/${projectId}` : "#"}>
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={project?.title || "Project"}
                              className="project-image"
                            />
                          ) : (
                            <div className="project-placeholder-image">
                              <FaFolder className="folder-icon" />
                            </div>
                          )}
                        </Link>

                        {/* ছবির ওপর হোভার করলে GitHub Client & Server Link থাকবে */}
                        <div
                          className="project-overlay"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {githubClient && (
                            <a
                              href={githubClient}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="GitHub Client Code"
                            >
                              <FaGithub />
                            </a>
                          )}
                          {githubServer && (
                            <a
                              href={githubServer}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="GitHub Server Code"
                            >
                              <FaGithub style={{ color: "#06b6d4" }} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Meta Info */}
                    <div className="project-info">
                      {/* Category Badge */}
                      <span className="project-category-text">
                        {project?.category || "Web Design & Development"}
                      </span>

                      {/* Title (Single Project Page-এ নেভিগেট করবে) */}
                      <Link to={projectId ? `/projects/${projectId}` : "#"}>
                        <h3 className="project-title hover:text-cyan-400 transition-colors">
                          {project?.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      {project?.description && (
                        <p className="project-description">
                          {project.description.length > 90
                            ? `${project.description.substring(0, 90)}...`
                            : project.description}
                        </p>
                      )}

                      {/* Technologies List */}
                      {Array.isArray(project?.technologies) &&
                        project.technologies.length > 0 && (
                          <div className="project-tech-tags">
                            {project.technologies.map((tech, idx) => (
                              <span key={idx} className="tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* প্রজেক্ট কার্ডের ফুটার: রেটিং + একমাত্র Live Link ও Details/Review বাটন */}
                      <div className="project-rating-footer flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                        {/* রেটিং ও রিভিউ সংখ্যা */}
                        <div className="project-rating-wrapper flex items-center gap-1">
                          <FaStar className="star-icon text-yellow-400 text-xs" />
                          <span className="rating-score font-semibold text-white text-xs">
                            {totalReviews > 0 ? avgRating : "New"}
                          </span>
                          {totalReviews > 0 && (
                            <span className="reviews-count text-gray-500 text-[11px]">
                              ({totalReviews})
                            </span>
                          )}
                        </div>

                        {/* অ্যাকশন বাটন: একমাত্র Live Demo লিংক এবং Details & Review লিংক */}
                        <div className="flex items-center gap-3">
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                              title="Visit Live Site"
                            >
                              <FaExternalLinkAlt className="text-[10px]" /> Live
                            </a>
                          )}

                          {projectId && (
                            <Link
                              to={`/projects/${projectId}`}
                              className="details-link text-cyan-400 hover:underline text-xs font-medium"
                            >
                              Details & Review →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 💡 Show More / Show Less Button Container */}
            {categoryFiltered.length > 6 && (
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button
                  onClick={() => setShowAll(!showAll)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#06b6d4",
                    border: "1px solid #06b6d4",
                    padding: "0.75rem 2rem",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#06b6d4";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#06b6d4";
                  }}
                >
                  {showAll ? (
                    <>
                      Show Less <FaChevronUp style={{ fontSize: "0.8rem" }} />
                    </>
                  ) : (
                    <>
                      More Projects ({categoryFiltered.length - 6} More){" "}
                      <FaChevronDown style={{ fontSize: "0.8rem" }} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
