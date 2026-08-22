import { useState } from "react";
import DynamicIcon from "../../../../components/DynamicIcon";

const AddSkill = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Frontend",
    proficiency: 90,
    icon: "FaHtml5",
    description: "",
    isFeatured: false,
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
      const payload = {
        ...formData,
        icon: formData.icon.trim(), // ইনপুট থেকে অতিরিক্ত স্পেস বাদ দেবে
        proficiency: Number(formData.proficiency),
      };

      const res = await fetch(
        "https://portfolio-backend-89ma.vercel.app/api/skill",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Skill added successfully!");
        setFormData({
          title: "",
          category: "Frontend",
          proficiency: 90,
          icon: "FaHtml5",
          description: "",
          isFeatured: false,
        });
      } else {
        alert(
          "Failed to add skill: " + (result.message || "Something went wrong"),
        );
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error or server down!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Skill</h2>
      <form onSubmit={handleSubmit} className="skill-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. React.js"
            required
          />
        </div>

        <div className="form-row" style={{ display: "flex", gap: "16px" }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools & Technology</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
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

        {/* Dynamic Icon Preview Input */}
        <div className="form-group">
          <label>Icon Name (React Icons)</label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="e.g. FaReact, SiMongodb, SiExpress"
              required
              style={{ flex: 1 }}
            />

            {/* Live Icon Preview */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "#f9fafb",
                flexShrink: 0,
              }}
              title="Icon Preview"
            >
              <DynamicIcon iconName={formData.icon} size={24} color="#3b82f6" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="State management, hooks, custom components..."
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured Skill
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
    </div>
  );
};

export default AddSkill;
