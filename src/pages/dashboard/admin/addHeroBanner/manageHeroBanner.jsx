import { useState } from "react";
import { RiEditBoxLine, RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";
import {
  useDeleteHeroBannerMutation,
  useGetHeroBannerQuery,
  useUpdateHeroBannerMutation,
} from "../../../../redux/features/hero/heroBannerApi";

const ManageHeroBanner = () => {
  const { data: bannerData, isLoading: fetching } = useGetHeroBannerQuery();
  const [updateHeroBanner, { isLoading: isUpdating }] =
    useUpdateHeroBannerMutation();
  const [deleteHeroBanner] = useDeleteHeroBannerMutation();

  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    primaryBtnText: "",
    primaryBtnLink: "",
    secondaryBtnText: "",
    resumeUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // ডাটা ফরম্যাটিং (অ্যারে নিশ্চিত করা)
  const banners = Array.isArray(bannerData)
    ? bannerData
    : bannerData
      ? [bannerData]
      : [];

  // Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Hero Banner?"))
      return;

    try {
      const res = await deleteHeroBanner(id).unwrap();
      if (res.success || res) {
        alert("Hero Banner deleted successfully!");
      }
    } catch (error) {
      alert("Delete failed: " + (error?.data?.message || error.message));
    }
  };

  // Edit Modal Open
  const handleEditClick = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      description: banner.description || "",
      primaryBtnText: banner.primaryBtnText || "View Projects",
      primaryBtnLink: banner.primaryBtnLink || "/projects",
      secondaryBtnText: banner.secondaryBtnText || "Download CV",
      resumeUrl: banner.resumeUrl || banner.secondaryBtnLink || "",
    });
    setPreviewUrl(banner.imageUrl || banner.image || "");
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Update Handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("description", formData.description);
    data.append("primaryBtnText", formData.primaryBtnText);
    data.append("primaryBtnLink", formData.primaryBtnLink);
    data.append("secondaryBtnText", formData.secondaryBtnText);
    data.append("resumeUrl", formData.resumeUrl);

    // 🔴 ইউজার নতুন ছবি সিলেক্ট করলে তবেই ফাইল যুক্ত হবে
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await updateHeroBanner({
        id: editingBanner._id,
        formData: data,
      }).unwrap();

      if (res.success || res) {
        alert("Hero Banner updated successfully!");
        setEditingBanner(null);
      }
    } catch (error) {
      alert("Update failed: " + (error?.data?.message || error.message));
    }
  };

  return (
    <div className="manage-hero-container">
      <h2>Manage Hero Banners</h2>

      <div className="table-responsive">
        <table className="banner-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading Hero Banners...
                </td>
              </tr>
            ) : banners.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Hero Banners found.
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner._id}>
                  <td>
                    <img
                      src={banner.imageUrl || banner.image}
                      alt={banner.title}
                      className="table-thumb"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </td>
                  <td>
                    <strong>{banner.title}</strong>
                  </td>
                  <td>{banner.subtitle}</td>
                  <td className="desc-cell">{banner.description}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEditClick(banner)}
                        className="edit-btn"
                      >
                        <RiEditBoxLine /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
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

      {/* Edit Modal */}
      {editingBanner && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Hero Banner</h3>
              <button
                onClick={() => setEditingBanner(null)}
                className="close-btn"
              >
                <RiCloseLine />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="hero-form">
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
                <label>Subtitle / Designation</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Primary Button Options */}
              <div className="form-row">
                <div className="form-group">
                  <label>Primary Button Text</label>
                  <input
                    type="text"
                    name="primaryBtnText"
                    value={formData.primaryBtnText}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Primary Button Link</label>
                  <input
                    type="text"
                    name="primaryBtnLink"
                    value={formData.primaryBtnLink}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Secondary Button & Resume */}
              <div className="form-row">
                <div className="form-group">
                  <label>Secondary Button Text</label>
                  <input
                    type="text"
                    name="secondaryBtnText"
                    value={formData.secondaryBtnText}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Resume / CV Link</label>
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image Upload Field */}
              <div className="form-group">
                <label>Hero Image (Leave empty to keep existing image)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewUrl && (
                  <div className="image-preview" style={{ marginTop: "10px" }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHeroBanner;
