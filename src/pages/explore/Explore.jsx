
import DynamicIcon from "../../components/DynamicIcon";

const Explore = () => {
  // পোর্টফোলিও হাইলাইটস ডাটা
  const stats = [
    { id: 1, count: "15+", label: "Completed Projects", icon: "FaProjectDiagram" },
    { id: 2, count: "100%", label: "Client Satisfaction", icon: "FaSmile" },
    { id: 3, count: "24/7", label: "Clean Code Standard", icon: "FaCode" },
    { id: 4, count: "MERN", label: "Core Expertise", icon: "FaLayerGroup" },
  ];

  // গিটহাব এবং এক্সপ্লোরেশন অ্যাকশন
  const exploreActions = [
    {
      id: 1,
      title: "GitHub Repositories",
      description: "Dive directly into my open-source codebases, backend services, and modular components.",
      icon: "FaGithub",
      btnText: "Visit GitHub",
      link: "https://github.com",
    },
    {
      id: 2,
      title: "Live Demonstrations",
      description: "Test full-stack applications with real-time authentication, database CRUD, and dashboards.",
      icon: "FaRocket",
      btnText: "View Live Demos",
      link: "#projects",
    },
    {
      id: 3,
      title: "Technical Resume",
      description: "Download or inspect my updated CV detailing work history, stack proficiency, and engineering background.",
      icon: "FaFileAlt",
      btnText: "Download Resume",
      link: "#resume",
    },
  ];

  return (
    <section className="explore-section" id="explore">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-header">
          <span className="explore-badge">Code & Architecture</span>
          <h2 className="explore-main-title">Explore My Ecosystem</h2>
          <p className="explore-sub-title">
            Inspect my engineering workflow, project metrics, and technical accomplishments.
          </p>
        </div>

        {/* Stats Showcase Grid */}
        <div className="explore-stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.id}>
              <div className="stat-icon-box">
                <DynamicIcon iconName={item.icon} size={22} color="#3b82f6" />
              </div>
              <div className="stat-details">
                <h3 className="stat-count">{item.count}</h3>
                <p className="stat-label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Actions Grid */}
        <div className="explore-actions-grid">
          {exploreActions.map((action) => (
            <div className="action-card" key={action.id}>
              <div className="action-header">
                <div className="action-icon-box">
                  <DynamicIcon iconName={action.icon} size={24} color="#1d4ed8" />
                </div>
                <h3 className="action-title">{action.title}</h3>
              </div>
              <p className="action-description">{action.description}</p>
              <a 
                href={action.link} 
                className="action-btn"
                target={action.link.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
              >
                <span>{action.btnText}</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Explore;