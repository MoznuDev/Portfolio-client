import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";
import { useAddProjectMutation } from "../../../../redux/features/project/projectApi";

const AddProject = () => {
  // RTK Query Mutation Hook
  const [addProject, { isLoading }] = useAddProjectMutation();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Full Stack",
    image: "", // Cloudinary URL or Direct Image Link
    liveLink: "",
    githubClient: "",
    githubServer: "",
    featured: false,
    status: "completed",
    order: 0,
  });

  const [technologies, setTechnologies] = useState([""]);
  const [uploading, setUploading] = useState(false);

  // 💡 Cloudinary Direct Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "vjlhguxj";
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "uxpksmbv";

    if (!uploadPreset || !cloudName) {
      alert("Cloudinary configuration missing in environment variables.");
      setUploading(false);
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const fileData = await res.json();

      if (fileData.secure_url) {
        setFormData((prev) => ({
          ...prev,
          image: fileData.secure_url,
        }));
      } else {
        alert("Image upload failed. Please check Cloudinary configuration.");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    const generatedSlug = titleValue
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      title: titleValue,
      slug: generatedSlug,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Dynamic technologies inputs
  const handleTechChange = (index, value) => {
    const updated = [...technologies];
    updated[index] = value;
    setTechnologies(updated);
  };

  const handleAddTech = () => setTechnologies([...technologies, ""]);
  const handleRemoveTech = (index) =>
    setTechnologies(technologies.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image.trim()) {
      alert("Please upload an image or enter an image URL.");
      return;
    }

    try {
      const { image, liveLink, ...restFormData } = formData;

      const projectData = {
        ...restFormData,
        projectImage: image, // ইমেজ লিংক বা ক্লাউডিনারি ফাইল লিংক
        liveUrl: liveLink, // ডাটাবেজে লাইভ ডেমো ইউআরএল হিসেবে যাবে
        order: Number(formData.order),
        technologies: technologies.filter((t) => t.trim() !== ""),
      };

      await addProject(projectData).unwrap();

      alert("Project added successfully!");

      // Reset Form State
      setFormData({
        title: "",
        slug: "",
        description: "",
        category: "Full Stack",
        image: "",
        liveLink: "",
        githubClient: "",
        githubServer: "",
        featured: false,
        status: "completed",
        order: 0,
      });
      setTechnologies([""]);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(
        "Failed to add project: " +
          (error?.data?.message || error.message || "Something went wrong"),
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        {/* Title & Slug */}
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Industrial Salt Factory Management"
              required
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="industrial-salt-factory-management"
              required
            />
          </div>
        </div>

        {/* Cloudinary File Input & Image Live Link Option */}
        <div className="form-row">
          <div className="form-group">
            <label>Upload Project Image (Cloudinary or Direct URL)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && (
              <p
                style={{ color: "#3b82f6", fontSize: "14px", marginTop: "4px" }}
              >
                Uploading image...
              </p>
            )}

            {/* Direct Image URL input option */}
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Or paste Direct Image URL (https://...)"
              style={{ marginTop: "8px" }}
            />

            {/* Uploaded or Linked Image Preview */}
            {formData.image && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={formData.image}
                  alt={formData.title || "Uploaded Preview"}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #334155",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Live Website Link</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://myproject.com"
            />
          </div>
        </div>

        {/* GitHub Links */}
        <div className="form-row">
          <div className="form-group">
            <label>GitHub Client URL</label>
            <input
              type="url"
              name="githubClient"
              value={formData.githubClient}
              onChange={handleChange}
              placeholder="https://github.com/username/client-repo"
            />
          </div>

          <div className="form-group">
            <label>GitHub Server URL</label>
            <input
              type="url"
              name="githubServer"
              value={formData.githubServer}
              onChange={handleChange}
              placeholder="https://github.com/username/server-repo"
            />
          </div>
        </div>

        {/* Category & Status */}
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>

        {/* Order Position */}
        <div className="form-row">
          <div className="form-group">
            <label>Order Position</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="A comprehensive web-based operations..."
            required
          />
        </div>

        {/* Dynamic Technologies Array */}
        <div className="form-group">
          <label>Technologies</label>
          {technologies.map((tech, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
                placeholder={`Technology ${index + 1} (e.g. React, Node.js)`}
                required
              />
              {technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTech}
            className="add-field-btn"
          >
            <RiAddLine /> Add Technology
          </button>
        </div>

        {/* Featured Checkbox */}
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Project
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading || uploading}
        >
          {isLoading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
