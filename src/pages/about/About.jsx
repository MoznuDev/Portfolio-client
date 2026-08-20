
const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Section Header */}
        <div className="about-header">
          <span className="about-badge">Get To Know Me</span>
          <h2 className="about-main-title">About Me</h2>
          <p className="about-sub-title">
            Crafting Scalable, Modern & User-Centric Web Solutions
          </p>
        </div>

        <div className="about-content-grid">
          
          {/* Left Side: Personal Bio */}
          <div className="about-bio">
            <h3 className="about-greeting">
              Hi, I'm <span className="highlight-text">Moznur Rahman</span>
            </h3>
            <p className="about-text">
              A passionate <strong>Full-Stack Web Developer</strong> specializing in the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js).
            </p>
            <p className="about-text">
              I build clean, high-performance, and scalable web applications that bridge the gap between frontend user experience and backend system architecture. With hands-on experience in <strong>TypeScript, Redux Toolkit, Next.js, and Tailwind CSS</strong>, I focus on writing modular code and crafting responsive interfaces.
            </p>

            {/* Quick Info Grid */}
            <div className="about-info-grid">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">Moznur Rahman</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value">Full-Stack Developer</span>
              </div>
              <div className="info-item">
                <span className="info-label">Core Stack</span>
                <span className="info-value">MERN Stack</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Right Side: What I Do */}
          <div className="about-services-box">
            <h4 className="services-title">What I Do</h4>

            <div className="services-list">
              <div className="service-item">
                <div className="service-number">01</div>
                <div className="service-details">
                  <h5>Frontend Excellence</h5>
                  <p>
                    Designing dynamic, accessible, and high-speed UI/UX with React, Next.js, and Tailwind CSS.
                  </p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-number">02</div>
                <div className="service-details">
                  <h5>Robust Backend</h5>
                  <p>
                    Architecting RESTful APIs, secure authentication, and database management using Node.js, Express, and MongoDB.
                  </p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-number">03</div>
                <div className="service-details">
                  <h5>Performance & Optimization</h5>
                  <p>
                    Building scalable server infrastructure, seamless state management, and smooth API integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;