import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // Array states for technologies and features
  const [technologies, setTechnologies] = useState([""]);
  const [features, setFeatures] = useState([""]);
  const [loading, setLoading] = useState(false);

  // Text inputs handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dynamic input handler (Technologies & Features)
  const handleArrayChange = (index, value, type) => {
    if (type === "tech") {
      const updated = [...technologies];
      updated[index] = value;
      setTechnologies(updated);
    } else {
      const updated = [...features];
      updated[index] = value;
      setFeatures(updated);
    }
  };

  // Add new field
  const handleAddField = (type) => {
    if (type === "tech") {
      setTechnologies([...technologies, ""]);
    } else {
      setFeatures([...features, ""]);
    }
  };

  // Remove field
  const handleRemoveField = (index, type) => {
    if (type === "tech") {
      const updated = technologies.filter((_, i) => i !== index);
      setTechnologies(updated);
    } else {
      const updated = features.filter((_, i) => i !== index);
      setFeatures(updated);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Empty fields filter out করা
    const cleanedTech = technologies.filter((item) => item.trim() !== "");
    const cleanedFeatures = features.filter((item) => item.trim() !== "");

    const serviceData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      technologies: cleanedTech,
      features: cleanedFeatures,
    };

    try {
      const res = await fetch(
        "https://portfolio-backend-89ma.vercel.app/api/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        },
      );

      const result = await res.json();

      if (result.success) {
        alert("Service added successfully!");
        // Reset form
        setFormData({ title: "", description: "", icon: "" });
        setTechnologies([""]);
        setFeatures([""]);
      } else {
        alert("Failed to add service: " + result.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-service-container">
      <h2>Add New Service</h2>

      <form onSubmit={handleSubmit} className="service-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. UI/UX & Interface Design"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Designing clean, intuitive..."
            required
          />
        </div>

        {/* Icon URL */}
        <div className="form-group">
          <label htmlFor="icon">Icon URL</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="https://cdn-icons-png.flaticon.com/..."
            required
          />
        </div>

        {/* Technologies Array Input */}
        <div className="form-group">
          <label>Technologies</label>
          {technologies.map((tech, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={tech}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "tech")
                }
                placeholder={`Technology ${index + 1} (e.g. Figma)`}
                required
              />
              {technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "tech")}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("tech")}
            className="add-field-btn"
          >
            <RiAddLine /> Add Technology
          </button>
        </div>

        {/* Features Array Input */}
        <div className="form-group">
          <label>Features</label>
          {features.map((feature, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "feature")
                }
                placeholder={`Feature ${index + 1}`}
                required
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "feature")}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("feature")}
            className="add-field-btn"
          >
            <RiAddLine /> Add Feature
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
