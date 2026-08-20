
const TermsOfService = () => {
  const lastUpdated = "August 19, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this portfolio website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use this site.",
    },
    {
      id: "intellectual-property",
      title: "2. Intellectual Property Rights",
      content:
        "All original content, source code, designs, projects, logos, and materials published on this website are the intellectual property of Moznur Rahman unless stated otherwise. Unauthorized duplication, distribution, or reproduction without prior written consent is strictly prohibited.",
    },
    {
      id: "user-conduct",
      title: "3. Acceptable Use",
      content:
        "You agree to use this website only for lawful purposes. You must not use this site to distribute malicious software, attempt unauthorized access to system databases, or engage in any activity that disrupts the website's performance.",
    },
    {
      id: "disclaimer",
      title: "4. Disclaimer of Warranties",
      content:
        "The services, code samples, and information provided on this website are on an 'as is' and 'as available' basis. While I strive for complete accuracy, no express or implied warranties are made regarding performance, reliability, or completeness.",
    },
    {
      id: "limitation",
      title: "5. Limitation of Liability",
      content:
        "In no event shall Moznur Rahman be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the content or services provided on this portfolio.",
    },
    {
      id: "contact",
      title: "6. Contact Information",
      content:
        "If you have any questions or inquiries regarding these Terms of Service, please contact me directly via the contact form or email provided on this website.",
    },
  ];

  return (
    <section className="tos-section" id="terms-of-service">
      <div className="tos-container">
        {/* Header */}
        <div className="tos-header">
          <span className="tos-badge">Legal Policy</span>
          <h1 className="tos-main-title">Terms of Service</h1>
          <p className="tos-updated-date">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Body */}
        <div className="tos-content-card">
          <p className="tos-intro">
            Welcome to my official portfolio. Please read these Terms of Service carefully before utilizing any resources, reviewing code repositories, or submitting inquiries.
          </p>

          <div className="tos-sections-list">
            {sections.map((sec) => (
              <div className="tos-item" key={sec.id}>
                <h3 className="tos-item-title">{sec.title}</h3>
                <p className="tos-item-content">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;