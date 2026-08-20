import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line, RiArrowLeftLine } from "react-icons/ri";

const UpdateProject = ({ project, onBack, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    category: project?.category || "Full Stack",
    featured: project?.featured || false,
    status: project?.status || "completed",
    order: project?.order ?? 0,
  });

  const [technologies, setTechnologies] = useState(
    project?.technologies?.length ? project.technologies : [""]
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechChange = (index, value) => {
    const updated = [...technologies];
    updated[index] = value;
    setTechnologies(updated);
  };

  const handleAddTech = () => setTechnologies([...technologies, ""]);
  const handleRemoveTech = (index) => setTechnologies(technologies.filter((_, i) => i !== index));

 const handleSubmit = async (e) => {
  e.preventDefault();

  const projectId = project?._id || project?.id;
  if (!projectId) {
    alert("Invalid Project ID");
    return;
  }

  setLoading(true);

  const updatedData = {
    ...formData,
    order: Number(formData.order),
    technologies: technologies.filter((t) => t.trim() !== ""),
  };

  try {
    const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await res.json();

    if (res.ok && (result.success || result.acknowledged)) {
      alert("Project updated successfully!");
      onUpdateSuccess();
    } else {
      // ব্যাকএন্ডের আসল এরর মেসেজ অ্যালার্টে দেখানো
      alert("Update failed: " + (result.message || result.error || "Unknown server error"));
    }
  } catch (error) {
    console.error("Update Error:", error);
    alert("Network or Server error: " + error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="form-container">
      <button onClick={onBack} className="back-btn">
        <RiArrowLeftLine /> Back to Manage Projects
      </button>

      <h2>Update Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>

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

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Technologies</label>
          {technologies.map((tech, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
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
          <button type="button" onClick={handleAddTech} className="add-field-btn">
            <RiAddLine /> Add Technology
          </button>
        </div>

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

        <div className="form-actions">
          <button type="button" onClick={onBack} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;