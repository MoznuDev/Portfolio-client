import { useState } from "react";
import { useAddHeroBannerMutation } from "../../../../redux/features/heroBanner/heroBannerApi";

const AddHeroBanner = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    primaryBtnText: "View Projects",
    primaryBtnLink: "/projects",
    secondaryBtnText: "Download CV",
    resumeUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // RTK Query Mutation Hook
  const [addHeroBanner, { isLoading }] = useAddHeroBannerMutation();

  // Text Inputs Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload Handler & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Multipart Form Data Build
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("description", formData.description);
    data.append("primaryBtnText", formData.primaryBtnText);
    data.append("primaryBtnLink", formData.primaryBtnLink);
    data.append("secondaryBtnText", formData.secondaryBtnText);
    data.append("resumeUrl", formData.resumeUrl);

    if (imageFile) {
      data.append("image", imageFile); // ব্যাকএন্ডের upload.single("image") এর সাথে মিল রেখে
    }

    try {
      // RTK Query কল
      const res = await addHeroBanner(data).unwrap();

      if (res.success || res._id) {
        alert("Hero Banner created/updated successfully!");
        // ফর্ম রিবুট বা ক্লিয়ার
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          primaryBtnText: "View Projects",
          primaryBtnLink: "/projects",
          secondaryBtnText: "Download CV",
          resumeUrl: "",
        });
        setImageFile(null);
        setPreviewUrl("");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(
        error?.data?.message ||
          "Failed to update Hero Banner. Please check network/auth.",
      );
    }
  };

  return (
    <div className="hero-form-container">
      <h2 className="hero-form-title">Hero Banner Manager</h2>

      <form onSubmit={handleSubmit} className="hero-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Hero Title"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label htmlFor="subtitle">Subtitle / Designation</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="e.g. MERN Stack Developer"
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
            placeholder="Enter short description"
            required
          />
        </div>

        {/* Primary Button Options */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="primaryBtnText">Primary Button Text</label>
            <input
              type="text"
              id="primaryBtnText"
              name="primaryBtnText"
              value={formData.primaryBtnText}
              onChange={handleChange}
              placeholder="View Projects"
            />
          </div>
          <div className="form-group">
            <label htmlFor="primaryBtnLink">Primary Button Link</label>
            <input
              type="text"
              id="primaryBtnLink"
              name="primaryBtnLink"
              value={formData.primaryBtnLink}
              onChange={handleChange}
              placeholder="/projects"
            />
          </div>
        </div>

        {/* Secondary Button & Resume */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="secondaryBtnText">Secondary Button Text</label>
            <input
              type="text"
              id="secondaryBtnText"
              name="secondaryBtnText"
              value={formData.secondaryBtnText}
              onChange={handleChange}
              placeholder="Download CV"
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumeUrl">Resume / CV Download URL</label>
            <input
              type="url"
              id="resumeUrl"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
            />
          </div>
        </div>

        {/* Image Upload Field */}
        <div className="form-group">
          <label htmlFor="image">Hero Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {previewUrl && (
            <div className="image-preview" style={{ marginTop: "10px" }}>
              <p>Image Preview:</p>
              <img
                src={previewUrl}
                alt="Hero Banner Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Hero Banner"}
        </button>
      </form>
    </div>
  );
};

export default AddHeroBanner;
