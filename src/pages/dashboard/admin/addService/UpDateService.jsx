import React, { useState } from "react";

const API_URL = "https://portfolio-backend-89ma.vercel.app/api/services";

const UpdateService = ({ serviceData, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: serviceData?.title || "",
    description: serviceData?.description || "",
    icon: serviceData?.icon || "",
    technologies: serviceData?.technologies
      ? serviceData.technologies.join(", ")
      : "",
    features: serviceData?.features ? serviceData.features.join(", ") : "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedPayload = {
      ...formData,
      technologies: formData.technologies
        ? formData.technologies
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        : [],
      features: formData.features
        ? formData.features
            .split(",")
            .map((feat) => feat.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const res = await fetch(`${API_URL}/${serviceData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayload),
      });

      const result = await res.json();

      if (result.success) {
        alert("Service updated successfully!");
        onUpdateSuccess(result.data || { ...serviceData, ...updatedPayload });
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Something went wrong while updating!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Update Service</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Icon URL:</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Technologies (Comma separated):</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group">
            <label>Features (Comma separated):</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Fast, Responsive, Secure"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
