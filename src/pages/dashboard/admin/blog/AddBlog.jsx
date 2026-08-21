import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "Backend Development",
    coverImage: "",
    readTime: "5 min read",
    isFeatured: false,
    publishedAt: new Date().toISOString().slice(0, 16),
    authorName: "Moznur Rahman",
    authorRole: "Full Stack Developer",
    authorAvatar: "",
  });

  const [tags, setTags] = useState([""]);
  const [loading, setLoading] = useState(false);

  // অটো-স্লাগ জেনারেটর
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

  // Tags dynamic input handlers
  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const handleAddTag = () => setTags([...tags, ""]);
  const handleRemoveTag = (index) =>
    setTags(tags.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      coverImage: formData.coverImage,
      readTime: formData.readTime,
      isFeatured: formData.isFeatured,
      publishedAt: new Date(formData.publishedAt).toISOString(),
      tags: tags.filter((t) => t.trim() !== ""),
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        avatar: formData.authorAvatar,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Blog added successfully!");
        setFormData({
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          category: "Backend Development",
          coverImage: "",
          readTime: "5 min read",
          isFeatured: false,
          publishedAt: new Date().toISOString().slice(0, 16),
          authorName: "Moznur Rahman",
          authorRole: "Full Stack Developer",
          authorAvatar: "",
        });
        setTags([""]);
      } else {
        alert("Failed to add blog: " + result.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Building Scalable REST APIs..."
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
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Backend Development">Backend Development</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Full Stack">Full Stack</option>
              <option value="DevOps & Tools">DevOps & Tools</option>
            </select>
          </div>

          <div className="form-group">
            <label>Read Time</label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g. 7 min read"
              required
            />
          </div>

          <div className="form-group">
            <label>Published At</label>
            <input
              type="datetime-local"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>

        <div className="form-group">
          <label>Excerpt</label>

          <input
            type="text"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Learn the best folder structures..."
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>

          <textarea
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            placeholder="Designing a clean architecture..."
            required
          />
        </div>

        {/* Dynamic Tags */}
        <div className="form-group">
          <label>Tags</label>
          {tags.map((tag, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder={`Tag ${index + 1} (e.g. Node.js)`}
                required
              />
              {tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTag}
            className="add-field-btn"
          >
            <RiAddLine /> Add Tag
          </button>
        </div>

        {/* Author Object Section */}
        <fieldset className="fieldset-group">
          <legend>Author Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Author Name</label>

              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Author Role</label>

              <input
                type="text"
                name="authorRole"
                value={formData.authorRole}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Avatar URL</label>

              <input
                type="text"
                name="authorAvatar"
                value={formData.authorAvatar}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured Blog Post
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
