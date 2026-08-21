import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const UpdateSkill = ({ skill, onBack, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: skill?.title || "",
    category: skill?.category || "Frontend",
    proficiency: skill?.proficiency || 90,
    icon: skill?.icon || "FaHtml5",
    description: skill?.description || "",
    isFeatured: skill?.isFeatured || false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/skill/${skill._id || skill.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            proficiency: Number(formData.proficiency),
          }),
        },
      );

      const result = await res.json();
      if (result.success) {
        alert("Skill updated successfully!");
        onUpdateSuccess();
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <button onClick={onBack} className="back-btn">
        <RiArrowLeftLine /> Back to Manage skill
      </button>

      <h2>Update Skill</h2>
      <form onSubmit={handleSubmit} className="skill-form">
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

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools & Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Proficiency (%)</label>
            <input
              type="number"
              name="proficiency"
              min="0"
              max="100"
              value={formData.proficiency}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Icon Name (React Icons - Fa)</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured Skill
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onBack} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSkill;
