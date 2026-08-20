

const PrivacyPolicy = () => {
  const lastUpdated = "August 19, 2026";

  const policies = [
    {
      id: "collection",
      title: "1. Information Collection",
      content:
        "We collect minimal personal data when you interact with this portfolio. This includes information provided voluntarily via the contact form, such as your name, email address, and message content.",
    },
    {
      id: "usage",
      title: "2. How We Use Information",
      content:
        "The collected information is solely used to respond to your direct inquiries, discuss potential work collaborations, or improve overall user experience on this website. Your details will never be sold or shared for commercial marketing.",
    },
    {
      id: "cookies",
      title: "3. Cookies & Analytics",
      content:
        "This site may use essential cookies and lightweight performance analytics tools to understand site traffic and ensure seamless navigational performance across different screen sizes.",
    },
    {
      id: "security",
      title: "4. Data Security",
      content:
        "Standard security protocols, including HTTPS encryption and secure database controls, are implemented to protect your submitted personal communication from unauthorized access or disclosure.",
    },
    {
      id: "third-party",
      title: "5. Third-Party Links",
      content:
        "This portfolio contains links to external platforms such as GitHub, LinkedIn, and live project demos. We are not responsible for the privacy practices or external content of these third-party websites.",
    },
    {
      id: "contact-privacy",
      title: "6. Contact & Data Access",
      content:
        "If you wish to review, update, or request the deletion of any personal details submitted via the contact form, please reach out directly through the official email listed on this site.",
    },
  ];

  return (
    <section className="privacy-section" id="privacy-policy">
      <div className="privacy-container">
        {/* Header */}
        <div className="privacy-header">
          <span className="privacy-badge">Legal & Security</span>
          <h1 className="privacy-main-title">Privacy Policy</h1>
          <p className="privacy-updated-date">Last Updated: {lastUpdated}</p>
        </div>

        {/* Main Content Box */}
        <div className="privacy-content-card">
          <p className="privacy-intro">
            Your privacy is important to me. This policy outlines how information submitted through this website is handled responsibly and securely.
          </p>

          <div className="privacy-sections-list">
            {policies.map((item) => (
              <div className="privacy-item" key={item.id}>
                <h3 className="privacy-item-title">{item.title}</h3>
                <p className="privacy-item-content">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;