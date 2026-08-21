import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { HiDownload } from "react-icons/hi";
import {
  useGetAllResumesQuery,
  useGetResumeByIdQuery,
} from "../../redux/features/resume/resumeApi";

const Resume = ({ resumeId }) => {
  const cvRef = useRef(); // 📌 CV এরিয়া সিলেক্ট করার জন্য Ref

  const idQuery = useGetResumeByIdQuery(resumeId, { skip: !resumeId });
  const allQuery = useGetAllResumesQuery(undefined, {
    skip: Boolean(resumeId),
  });

  const { data: response, isLoading, isError } = resumeId ? idQuery : allQuery;

  // 📥 PDF Download Handler Function
  const handleDownloadPdf = () => {
    const element = cvRef.current;

    const options = {
      margin: 10, // Margin in mm
      filename: "Resume_Moznur_Rahman.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // High resolution output
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  if (isLoading)
    return (
      <div className="loading" style={{ textAlign: "center", padding: "50px" }}>
        Loading...
      </div>
    );
  if (isError || !response)
    return (
      <div className="error" style={{ textAlign: "center", padding: "50px" }}>
        Error loading CV!
      </div>
    );

  const rawData = response?.data ?? response;
  const cv = Array.isArray(rawData) ? rawData[0] : rawData;

  if (!cv) return <div className="error">No CV Data Found</div>;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🔘 Download PDF Button */}
      <button
        onClick={handleDownloadPdf}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#00f2fe",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <HiDownload size={20} /> Download PDF
      </button>

      {/* 📄 CV Container */}
      <div ref={cvRef} className="cv-preview-container">
        {/* Header / Personal Info + Profile Image */}
        <header
          className="cv-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1>{cv.personalInfo?.fullName}</h1>
            <h2>{cv.personalInfo?.title}</h2>
            <div className="contact-info">
              <span>{cv.personalInfo?.email}</span> |{" "}
              <span>{cv.personalInfo?.phone}</span>
              {cv.personalInfo?.linkedin && (
                <>
                  {" "}
                  |{" "}
                  <a
                    href={cv.personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </>
              )}
              {cv.personalInfo?.github && (
                <>
                  {" "}
                  |{" "}
                  <a
                    href={cv.personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </>
              )}
            </div>
          </div>

          {/* 🖼️ Right Side Profile Image */}
          {cv.personalInfo?.image && (
            <div
              className="profile-image-container"
              style={{ marginLeft: "20px" }}
            >
              <img
                src={cv.personalInfo.image}
                alt={cv.personalInfo?.fullName}
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #00f2fe",
                }}
              />
            </div>
          )}
        </header>

        {/* Summary */}
        {cv.summary && (
          <section className="cv-section">
            <h3>Summary</h3>
            <p>{cv.summary}</p>
          </section>
        )}

        {/* Featured Project */}
        {cv.featuredProject && (
          <section className="cv-section">
            <h3>Featured Project</h3>
            <div className="project-block">
              <h4>{cv.featuredProject.title}</h4>
              <p className="tech-stack">
                {Array.isArray(cv.featuredProject.technologies)
                  ? cv.featuredProject.technologies.join(" | ")
                  : cv.featuredProject.technologies}
              </p>
              <p>{cv.featuredProject.description}</p>
            </div>
          </section>
        )}

        {/* Work Experience */}
        {cv.workExperience?.length > 0 && (
          <section className="cv-section">
            <h3>Work Experience</h3>
            {cv.workExperience.map((exp, idx) => (
              <div key={idx} className="experience-block">
                <div className="exp-header">
                  <strong>
                    • {exp.company} - {exp.role}
                  </strong>
                  <span className="date-location">
                    {exp.duration} - {exp.location}
                  </span>
                </div>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills & Tools */}
        {cv.skillsAndTools && (
          <section className="cv-section">
            <h3>Skills & Tools</h3>
            <table className="skills-table">
              <tbody>
                {cv.skillsAndTools.languages?.length > 0 && (
                  <tr>
                    <td>
                      <strong>Languages</strong>
                    </td>
                    <td>
                      {Array.isArray(cv.skillsAndTools.languages)
                        ? cv.skillsAndTools.languages.join(", ")
                        : cv.skillsAndTools.languages}
                    </td>
                  </tr>
                )}
                {cv.skillsAndTools.frontend?.length > 0 && (
                  <tr>
                    <td>
                      <strong>Front-End</strong>
                    </td>
                    <td>
                      {Array.isArray(cv.skillsAndTools.frontend)
                        ? cv.skillsAndTools.frontend.join(", ")
                        : cv.skillsAndTools.frontend}
                    </td>
                  </tr>
                )}
                {cv.skillsAndTools.backend?.length > 0 && (
                  <tr>
                    <td>
                      <strong>Back-End</strong>
                    </td>
                    <td>
                      {Array.isArray(cv.skillsAndTools.backend)
                        ? cv.skillsAndTools.backend.join(", ")
                        : cv.skillsAndTools.backend}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* Education */}
        {cv.education?.length > 0 && (
          <section className="cv-section">
            <h3>Education</h3>
            <ul className="education-list">
              {cv.education.map((edu, idx) => (
                <li key={idx}>
                  <strong>• {edu.institution}</strong> - ({edu.degree})
                  <br />
                  <span className="date-location">
                    ({edu.year}) - {edu.location}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Resume;
