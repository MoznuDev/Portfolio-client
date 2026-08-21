import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useAddReviewMutation,
} from "../../redux/features/project/projectApi";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaStar,
  FaArrowLeft,
  FaPaperPlane,
  FaPen,
  FaTimes,
} from "react-icons/fa";

const SingleProjectPage = () => {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetProjectByIdQuery(id);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [submitError, setSubmitError] = useState("");

  const project = response?.project || response?.data || response;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!comment.trim()) {
      setSubmitError("Please write a review comment.");
      return;
    }

    try {
      await addReview({
        projectId: id,
        userName: userName.trim() || "Anonymous",
        rating: Number(rating),
        comment: comment.trim(),
      }).unwrap();

      setComment("");
      setUserName("");
      setRating(5);
      setShowReviewForm(false);
    } catch (err) {
      setSubmitError(
        err?.data?.message || "Failed to submit review. Try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="status-container">
        <p className="loading-text">Loading Project Details...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="status-container">
        <p className="error-text">Failed to load project details.</p>
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Projects
        </Link>
      </div>
    );
  }

  const imageUrl =
    project?.projectImage || project?.image || project?.thumbnail;
  const liveUrl = project?.liveUrl || project?.liveLink;
  const githubUrl = project?.githubClient || project?.githubLink;
  const reviews = Array.isArray(project?.reviews) ? project.reviews : [];

  return (
    <div className="single-project-container">
      {/* Back Button */}
      <Link to="/" className="back-link mb-8">
        <FaArrowLeft /> Back to Projects
      </Link>

      <div className="project-card-grid">
        {/* Left: Project Image */}
        <div className="project-image-wrapper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project?.title || "Project Preview"}
              className="project-image"
            />
          ) : (
            <div className="no-image-placeholder">No Preview Available</div>
          )}
        </div>

        {/* Right: Project Information */}
        <div className="project-info-wrapper">
          <div>
            <span className="category-badge">
              {project?.category || "Development"}
            </span>

            <h1 className="project-title">{project?.title}</h1>

            <p className="project-description">{project?.description}</p>

            {/* Technologies */}
            {Array.isArray(project?.technologies) &&
              project.technologies.length > 0 && (
                <div className="tech-section">
                  <h3 className="tech-heading">TECHNOLOGIES USED</h3>
                  <div className="tech-list">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Actions & Links */}
          <div className="project-actions">
            <div className="btn-group">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Header with Toggle Button */}
      <div className="review-header">
        <h2 className="section-title">Reviews ({reviews.length})</h2>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="btn btn-outline"
        >
          {showReviewForm ? (
            <>
              <FaTimes /> Close Form
            </>
          ) : (
            <>
              <FaPen /> Write a Review
            </>
          )}
        </button>
      </div>

      {/* Collapsible Review Form */}
      {showReviewForm && (
        <div className="review-form-card">
          <h3 className="form-title">Leave Your Feedback</h3>

          {submitError && <p className="form-error">{submitError}</p>}

          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-grid">
              {/* User Name */}
              <div className="input-group">
                <label className="input-label">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Rating Selector */}
              <div className="input-group">
                <label className="input-label">Rating</label>
                <div className="star-rating-wrapper">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="star-btn"
                    >
                      <FaStar
                        className={
                          star <= rating ? "star-active" : "star-inactive"
                        }
                      />
                    </button>
                  ))}
                  <span className="rating-count">({rating}/5)</span>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="input-group">
              <label className="input-label">Your Review</label>
              <textarea
                rows="4"
                placeholder="Write your feedback or thoughts about this project..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-textarea"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary submit-btn"
            >
              <FaPaperPlane /> {isSubmitting ? "Submitting..." : "Post Review"}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="reviews-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="review-card">
              <div className="review-card-header">
                <span className="reviewer-name">
                  {rev.userName || rev.user || "Anonymous"}
                </span>
                <div className="rating-display">
                  <FaStar className="star-active" />
                  <span className="rating-num">{rev.rating}</span>
                </div>
              </div>
              <p className="review-comment">{rev.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reviews-text">
          No reviews yet. Be the first to leave a review!
        </p>
      )}
    </div>
  );
};

export default SingleProjectPage;
