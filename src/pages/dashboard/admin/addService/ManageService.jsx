import { useState, useEffect } from "react";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import UpdateService from "./UpDateService";

const API_URL = "https://portfolio-backend-i63g.vercel.app/api/services";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null); // এডিটের জন্য সিলেক্টেড ডাটা

  // ১. সব সার্ভিস ফেচ করা
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ২. Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        alert("Service deleted successfully!");
        setServices((prev) => prev.filter((service) => service._id !== id));
      } else {
        alert("Delete failed: " + result.message);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ৩. আপডেট হওয়ার পর লোকাল স্টেট আপডেট করার হ্যান্ডলার
  const handleUpdateSuccess = (updatedData) => {
    setServices((prev) =>
      prev.map((item) => (item._id === updatedData._id ? updatedData : item)),
    );
    setSelectedService(null); // মোডাল বন্ধ করা
  };

  return (
    <div className="manage-service-container">
      <h2>Manage Services</h2>

      <div className="table-responsive">
        <table className="service-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading services...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id}>
                  <td>
                    {service.icon ? (
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="table-icon"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td className="desc-cell">{service.description}</td>
                  <td>
                    <div className="tag-group">
                      {service.technologies?.map((tech, index) => (
                        <span key={index} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="tag-group">
                      {service.features?.map((feat, index) => (
                        <span key={index} className="feat-badge">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="edit-btn"
                      >
                        <RiEditBoxLine /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
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

      {/* ৪. এডিট মোডাল / ফর্ম রেন্ডারিং */}
      {selectedService && (
        <UpdateService
          serviceData={selectedService}
          onClose={() => setSelectedService(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ManageService;
