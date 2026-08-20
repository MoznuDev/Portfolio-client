import { useState } from "react";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";

import UpdateProject from "./UpdateProject";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../../../../redux/featurs/project/projectsApi";

const ManageProject = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // ১. RTK Query Hooks
  const { data, isLoading, isError, error } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const projects = data?.projects || [];

  // ২. ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id).unwrap();
      alert("Project deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed: " + (err?.data?.message || "Something went wrong"));
    }
  };

  // এডিট মোড
  if (selectedProject) {
    return (
      <UpdateProject
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        onUpdateSuccess={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="manage-project-container">
      {/* Header Section */}
      <div className="manage-project-header">
        <h2>Manage Projects</h2>
        <span className="total-badge">Total: {projects.length}</span>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="status-message loading">Loading projects...</div>
      ) : isError ? (
        <div className="status-message error">
          Failed to load projects: {error?.data?.message || "Server Error"}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="project-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title & Slug</th>
                <th>Category</th>
                <th>Technologies</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((item) => (
                  <tr key={item._id}>
                    <td className="order-cell">#{item.order}</td>

                    <td className="title-cell">
                      <div className="project-title">{item.title}</div>
                      <div className="project-slug">{item.slug}</div>
                    </td>

                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>

                    <td>
                      <div className="tech-stack">
                        {item.technologies?.map((tech, index) => (
                          <span key={index} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span className={`status-badge status-${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`featured-badge ${
                          item.featured ? "is-featured" : ""
                        }`}
                      >
                        {item.featured ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="text-right">
                      <div className="action-buttons">
                        <button
                          onClick={() => setSelectedProject(item)}
                          className="btn-edit"
                        >
                          <RiEditBoxLine /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
                          className="btn-delete"
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
      )}
    </div>
  );
};

export default ManageProject;