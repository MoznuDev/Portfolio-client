import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line, RiArrowLeftLine } from "react-icons/ri";

const UpdateBlog = ({ blog, onBack, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    content: blog?.content || "",
    excerpt: blog?.excerpt || "",
    category: blog?.category || "Backend Development",
    coverImage: blog?.coverImage || "",
    readTime: blog?.readTime || "5 min read",
    isFeatured: blog?.isFeatured || false,
    publishedAt: blog?.publishedAt
      ? new Date(blog.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    authorName: blog?.author?.name || "",
    authorRole: blog?.author?.role || "",
    authorAvatar: blog?.author?.avatar || "",
  });

  const [tags, setTags] = useState(blog?.tags?.length ? blog.tags : [""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

    const updatedData = {
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
      const res = await fetch(
        `https://portfolio-backend-i63g.vercel.app/api/blogs/${blog._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      const result = await res.json();
      if (result.success) {
        alert("Blog updated successfully!");
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
        <RiArrowLeftLine /> Back to Manage Blogs
      </button>

      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
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
            required
          />
        </div>

        <div className="form-group">
          <label>Tags</label>

          {tags.map((tag, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
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

        <div className="form-actions">
          <button type="button" onClick={onBack} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
