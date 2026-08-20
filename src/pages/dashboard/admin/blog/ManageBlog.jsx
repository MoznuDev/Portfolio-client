import { useState, useEffect } from "react";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import UpdateBlog from "./UpdateBlog";

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // ১. সব ব্লগ ফেচ করা
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      
      if (data.success) {
        // ব্যাকএন্ড response key data.data নাকি data.blogs বা সরাসরি array তা হ্যান্ডেল করা
        const blogList = data.data || data.blogs || [];
        setBlogs(Array.isArray(blogList) ? blogList : []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setBlogs([]); // Error হলে খালি Array সেট হবে
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ২. ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        alert("Blog deleted successfully!");
        fetchBlogs();
      } else {
        alert("Delete failed: " + result.message);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // এডিটের জন্য সিলেক্ট করলে UpdateBlog পেজ দেখাবে
  if (selectedBlog) {
    return (
      <UpdateBlog
        blog={selectedBlog}
        onBack={() => setSelectedBlog(null)}
        onUpdateSuccess={() => {
          setSelectedBlog(null);
          fetchBlogs();
        }}
      />
    );
  }

  return (
    <div className="manage-container">
      <h2>Manage Blogs</h2>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title & Category</th>
              <th>Tags</th>
              <th>Author</th>
              <th>Read Time</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Safe Array Length Check */}
            {!blogs || blogs.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="table-cover"
                    />
                  </td>
                  <td>
                    <strong>{item.title}</strong>
                    <br />
                    <span className="badge category-badge">{item.category}</span>
                  </td>
                  <td>
                    <div className="tag-group">
                      {item.tags?.map((tag, index) => (
                        <span key={index} className="tech-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <small>{item.author?.name || "N/A"}</small>
                  </td>
                  <td>{item.readTime}</td>
                  <td>
                    <span className={`badge ${item.isFeatured ? "featured" : "not-featured"}`}>
                      {item.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => setSelectedBlog(item)}
                        className="edit-btn"
                      >
                        <RiEditBoxLine /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="delete-btn"
                      >
                        <RiDeleteBin6Line /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlog;