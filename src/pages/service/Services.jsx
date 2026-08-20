import { useState } from 'react';
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
  FaChevronUp
} from 'react-icons/fa';
import { useGetServicesQuery } from '../../redux/featurs/services/serviceApi';

// ডায়নামিক আইকন রেন্ডার করার হেলপার ফাংশন
const renderServiceIcon = (iconName) => {
  const name = iconName?.toLowerCase() || '';
  if (name.includes('wordpress')) return <FaWordpress />;
  if (name.includes('react')) return <FaReact />;
  if (name.includes('vue')) return <FaVuejs />;
  if (name.includes('figma')) return <FaFigma />;
  if (name.includes('adobe') || name.includes('photo')) return <FaCamera />;
  if (name.includes('logo') || name.includes('design')) return <FaPencilRuler />;
  if (name.includes('code')) return <FaCode />;
  return <FaGlobe />;
};

const Services = () => {
  // ৪টির বেশি সার্ভিস থাকলে তা দেখানোর স্টেট
  const [showAll, setShowAll] = useState(false);

  const { data: response, isLoading, isError, error } = useGetServicesQuery(undefined, {
    refetchOnMountOrChange: true,
  });

  // ১. লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="services-loading">
        Loading Services...
      </div>
    );
  }

  // ২. এরর স্টেট
  if (isError) {
    console.error("API Error Object:", error);
    return (
      <div className="services-error">
        Failed to load services. Please check console for details.
      </div>
    );
  }

  // ৩. সেফলি ডাটা এক্সট্র্যাক্ট করা
  const getRawData = () => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.services)) return response.services;
    if (Array.isArray(response?.data?.services)) return response.data.services;
    return [];
  };

  const rawData = getRawData();

  // ৪. ডাটা খালি থাকলে ফলব্যাক UI
  if (rawData.length === 0) {
    return (
      <div className="services-error">
        No services found in database.
      </div>
    );
  }

  // 💡 মূল ফিল্টারিং: showAll true হলে সব দেখাবে, না হলে কঠোরভাবে প্রথম ৪টি দেখাবে
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
              key={service._id || service.id || service.slug || index}
            >
              {/* Service Icon */}
              <div className="service-icon">
                {service.icon?.startsWith('http') ? (
                  <img src={service.icon} alt={service.title || 'Service Icon'} />
                ) : (
                  renderServiceIcon(service.icon || service.title)
                )}
              </div>

              {/* Title */}
              <h3 className="service-title">{service.title}</h3>

              {/* Description */}
              <p className="service-description">
                {service.description || service.discription}
              </p>

              {/* Technologies List */}
              {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                <div className="service-technologies">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Features List */}
              {Array.isArray(service.features) && service.features.length > 0 && (
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

        {/* 💡 ৪টির বেশি সার্ভিস (যেমন ৬টি) থাকলেই এখন বাটন শো করবে */}
        {rawData.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '3rem', clear: 'both' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                backgroundColor: 'transparent',
                color: '#06b6d4',
                border: '1px solid #06b6d4',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#06b6d4';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#06b6d4';
              }}
            >
              {showAll ? (
                <>
                  Show Less <FaChevronUp style={{ fontSize: '0.8rem' }} />
                </>
              ) : (
                <>
                  More Services ({rawData.length - 4} More){' '}
                  <FaChevronDown style={{ fontSize: '0.8rem' }} />
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