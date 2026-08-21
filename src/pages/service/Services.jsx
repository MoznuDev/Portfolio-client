import { useState } from "react";
import {
  FaWordpress,
  FaReact,
  FaVuejs,
  FaFigma,
  FaCamera,
  FaPencilRuler,
  FaCode,
  FaGlobe,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useGetServicesQuery } from "../../redux/features/service/serviceApi";

// ডায়নামিক আইকন রেন্ডার করার হেলপার ফাংশন
const renderServiceIcon = (iconName) => {
  const name = iconName?.toLowerCase() || "";
  if (name.includes("wordpress")) return <FaWordpress />;
  if (name.includes("react")) return <FaReact />;
  if (name.includes("vue")) return <FaVuejs />;
  if (name.includes("figma")) return <FaFigma />;
  if (name.includes("adobe") || name.includes("photo")) return <FaCamera />;
  if (name.includes("logo") || name.includes("design"))
    return <FaPencilRuler />;
  if (name.includes("code")) return <FaCode />;
  return <FaGlobe />;
};

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetServicesQuery(undefined, {
    refetchOnMountOrChange: true,
  });

  // ১. সেফলি ডাটা এক্সট্র্যাক্ট করা
  const rawData = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : [];

  // ২. লোডিং স্টেট (Skeleton Loader)
  if (isLoading) {
    return (
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-main-title">Loading Services...</h2>
          </div>
          <div className="services-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="service-card skeleton-card" key={n}>
                <div className="skeleton-icon"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ৩. এরর স্টেট
  if (isError) {
    console.error("API Error Object:", error);
    return (
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="services-error">
            Failed to load services. Please check your backend connection.
          </div>
        </div>
      </section>
    );
  }

  // ৪. ডাটা খালি থাকলে ফলব্যাক UI
  if (rawData.length === 0) {
    return (
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="services-error">No services available right now.</div>
        </div>
      </section>
    );
  }

  // 💡 মূল ফিল্টারিং: showAll true হলে সব দেখাবে, না হলে প্রথম ৪টি দেখাবে
  const servicesList = showAll ? rawData : rawData.slice(0, 4);

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <div className="services-badge">
            <span className="bracket">┌</span>
            <span className="badge-text">My Specializations Services</span>
            <span className="bracket">┘</span>
          </div>
          <h2 className="services-main-title">What My Services</h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div
              className="service-card"
              key={service._id || service.id || index}
            >
              {/* Service Icon */}
              <div className="service-icon">
                {service.icon?.startsWith("http") ? (
                  <img
                    src={service.icon}
                    alt={service.title || "Service Icon"}
                  />
                ) : (
                  renderServiceIcon(service.icon || service.title)
                )}
              </div>

              {/* Title */}
              <h3 className="service-title">{service.title}</h3>

              {/* Description */}
              <p className="service-description">{service.description}</p>

              {/* Technologies List */}
              {Array.isArray(service.technologies) &&
                service.technologies.length > 0 && (
                  <div className="service-technologies">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              {/* Features List */}
              {Array.isArray(service.features) &&
                service.features.length > 0 && (
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <FaCheck className="feature-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>

        {/* 💡 ৪টির বেশি সার্ভিস থাকলেই বাটন শো করবে */}
        {rawData.length > 4 && (
          <div className="services-action-container">
            <button
              onClick={() => setShowAll(!showAll)}
              className="services-toggle-btn"
            >
              {showAll ? (
                <>
                  Show Less <FaChevronUp className="btn-icon" />
                </>
              ) : (
                <>
                  More Services ({rawData.length - 4} More){" "}
                  <FaChevronDown className="btn-icon" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
