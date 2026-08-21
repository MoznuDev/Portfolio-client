import { Clock } from "lucide-react";
import { useGetBlogsQuery } from "../../../redux/features/blog/blogApi";

const Blog = () => {
  const { data: response, isLoading, isError, error } = useGetBlogsQuery();

  if (isLoading) {
    return <div className="blog-status">Loading latest blogs...</div>;
  }

  if (isError) {
    console.error("Blog API Error:", error);
    return <div className="blog-status error">Failed to load blogs.</div>;
  }

  // API response থেকে blogs বের করা (আপনার JSON response অনুযায়ী)
  const blogs = response?.blogs || [];

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* Section Header */}
        <div className="blog-header">
          <div className="blog-badge">
            <span className="bracket-left">[</span>
            <span className="badge-text">My Recent Post</span>
            <span className="bracket-right">]</span>
          </div>
          <h2 className="blog-title">My Recent Blog</h2>
        </div>

        {/* Blog Cards Grid */}
        {blogs.length === 0 ? (
          <div className="blog-status">No blog posts found.</div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => {
              const blogId = blog._id || blog.id;

              return (
                <article key={blogId} className="blog-card">
                  {/* Folder Shape Image Top Notch */}
                  <div className="blog-image-wrapper">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="blog-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Blog Meta Info */}
                  <div className="blog-content">
                    <div className="blog-meta">
                      <div className="blog-tags">
                        <span className="tag category-tag">
                          {blog.category}
                        </span>
                        {blog.tags && blog.tags.length > 0 && (
                          <span className="tag sub-tag">{blog.tags[0]}</span>
                        )}
                      </div>

                      <div className="blog-read-time">
                        <Clock size={14} className="clock-icon" />
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="card-title">
                      <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
