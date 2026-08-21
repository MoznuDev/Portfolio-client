import { useState, useMemo } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaFolder,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../redux/features/project/projectApi";

// Helper function to calculate ratings cleanly
const calculateRatingInfo = (project) => {
  const reviews = Array.isArray(project?.reviews) ? project.reviews : [];
  const totalReviews =
    reviews.length > 0 ? reviews.length : Number(project?.numReviews) || 0;

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc, curr) => acc + (Number(curr.rating) || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : Number(project?.rating || 0).toFixed(1);

  return { totalReviews, avgRating };
};

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);

  // Redux API query
  const { data: response, isLoading, isError } = useGetProjectsQuery();

  // Extract raw list
  const rawData = response?.data || response?.projects || response;
  const projectsList = useMemo(
    () => (Array.isArray(rawData) ? rawData : []),
    [rawData]
  );

  // Dynamic categories with memoization
  const categories = useMemo(() => {
    return [
      "All Projects",
      ...new Set(
        projectsList.map((project) => project.category).filter(Boolean)
      ),
    ];
  }, [projectsList]);

  // Filtered project list by active category
  const categoryFiltered = useMemo(() => {
    return activeCategory === "All Projects"
      ? projectsList
      : projectsList.filter((project) => project.category === activeCategory);
  }, [projectsList, activeCategory]);

  // Projects to display (6 or All)
  const filteredProjects = showAll
    ? categoryFiltered
    : categoryFiltered.slice(0, 6);

  if (isLoading) {
    return <div className="projects-loading">Loading Projects...</div>;
  }

  if (isError) {
    return <div className="projects-error">Failed to load projects.</div>;
  }

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
                className={`filter-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="no-projects-found text-center py-12 text-gray-400">
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {filteredProjects.map((project, index) => {
                const projectId = project?._id || project?.id;
                const imageUrl =
                  project?.projectImage ||
                  project?.image ||
                  project?.thumbnail;
                const liveUrl =
                  project?.liveUrl || project?.liveLink || project?.live;
                const githubClient =
                  project?.githubClient || project?.githubLink;
                const githubServer = project?.githubServer;

                const { totalReviews, avgRating } = calculateRatingInfo(project);

                return (
                  <div
                    className="project-card"
                    key={projectId || project?.slug || index}
                  >
                    {/* Folder Header Shape & Image Area */}
                    <div className="project-folder-wrapper">
                      <div className="folder-tab"></div>

                      <div className="project-image-container relative cursor-pointer">
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

                        {/* GitHub Links Overlay */}
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

                    {/* Card Bottom Info */}
                    <div className="project-info">
                      <span className="project-category-text">
                        {project?.category || "Web Design & Development"}
                      </span>

                      <Link to={projectId ? `/projects/${projectId}` : "#"}>
                        <h3 className="project-title hover:text-cyan-400 transition-colors">
                          {project?.title}
                        </h3>
                      </Link>

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

                      {/* Card Footer: Ratings & Actions */}
                      <div className="project-rating-footer flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
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

            {/* Show More / Show Less Button */}
            {categoryFiltered.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-transparent text-cyan-400 border border-cyan-400 px-8 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 hover:bg-cyan-400 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {showAll ? (
                    <>
                      Show Less <FaChevronUp className="text-xs" />
                    </>
                  ) : (
                    <>
                      More Projects ({categoryFiltered.length - 6} More){" "}
                      <FaChevronDown className="text-xs" />
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

export default Project;