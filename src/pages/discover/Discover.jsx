
import DynamicIcon from "../../components/DynamicIcon";


const Discover = () => {
  const discoverCards = [
    {
      id: 1,
      icon: "FaLaptopCode",
      title: "Featured Projects",
      description:
        "Explore my latest production-ready web applications built with modern MERN architecture.",
      tag: "Case Studies",
    },
    {
      id: 2,
      icon: "FaServer",
      title: "Backend Architecture",
      description:
        "Check out REST APIs, MongoDB schemas, and authentication flows I design for scalability.",
      tag: "Node & Express",
    },
    {
      id: 3,
      icon: "FaDraftingCompass",
      title: "System Design & UI",
      description:
        "Discover responsive layouts, custom Tailwind designs, and seamless state management flows.",
      tag: "React & Next.js",
    },
  ];

  return (
    <section className="discover-section" id="discover">
      <div className="discover-container">
        
        {/* Header Section */}
        <div className="discover-header">
          <span className="discover-badge">Explore My Work</span>
          <h2 className="discover-main-title">Discover What I Build</h2>
          <p className="discover-sub-title">
            Take a deeper dive into my codebase, design philosophy, and technical highlights.
          </p>
        </div>

        {/* Discover Cards Grid */}
        <div className="discover-grid">
          {discoverCards.map((card) => (
            <div className="discover-card" key={card.id}>
              <div className="card-top">
                <div className="discover-icon-box">
                  <DynamicIcon iconName={card.icon} size={26} color="#3b82f6" />
                </div>
                <span className="card-tag">{card.tag}</span>
              </div>
              
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              
              <a href="#projects" className="discover-link">
                Explore More <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Discover;