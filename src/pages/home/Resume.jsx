import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { HiDownload } from "react-icons/hi";
import {
  useGetAllResumesQuery,
  useGetResumeByIdQuery,
} from "../../redux/features/resumes/resumeApi";

const Resume = ({ resumeId }) => {
  const cvRef = useRef();

  const idQuery = useGetResumeByIdQuery(resumeId, { skip: !resumeId });
  const allQuery = useGetAllResumesQuery(undefined, {
    skip: Boolean(resumeId),
  });

  const { data: response, isLoading, isError, error } = resumeId ? idQuery : allQuery;

  // 📥 PDF Download Handler Function
  const handleDownloadPdf = () => {
    const element = cvRef.current;
    if (!element) return;

    const options = {
      margin: [10, 10, 10, 10], // top, left, bottom, right in mm
      filename: `Resume_${cv?.personalInfo?.fullName?.replace(/\s+/g, "_") || "Moznur_Rahman"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true, // CORS হ্যান্ডেল করার জন্য
        logging: false,
        letterRendering: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  };

  if (isLoading) {
    return (
      <div className="loading text-center py-12 text-cyan-400 font-semibold">
        Loading CV...
      </div>
    );
  }

  if (isError) {
    console.error("Resume Loading Error:", error);
    return (
      <div className="error text-center py-12 text-red-500 font-semibold">
        Error loading CV! Please try again later.
      </div>
    );
  }

  const rawData = response?.data ?? response;
  const cv = Array.isArray(rawData) ? rawData[0] : rawData;

  if (!cv) {
    return (
      <div className="error text-center py-12 text-gray-400">
        No CV Data Found
      </div>
    );
  }

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
      <div ref={cvRef} className="cv-preview-container bg-white text-black p-8 rounded shadow-lg max-w-4xl w-full">
        {/* Header / Personal Info + Profile Image */}
        <header
          className="cv-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "2px solid #00f2fe",
            paddingBottom: "15px",
          }}
        >
          <div>
            <h1 className="text-3xl font-bold">{cv.personalInfo?.fullName}</h1>
            <h2 className="text-xl text-gray-700 font-medium">{cv.personalInfo?.title}</h2>
            <div className="contact-info text-sm text-gray-600 mt-2">
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
                    className="text-blue-600 hover:underline"
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
                    className="text-blue-600 hover:underline"
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
                alt={cv.personalInfo?.fullName || "Profile"}
                crossOrigin="anonymous"
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #00f2fe",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </header>

        {/* Summary */}
        {cv.summary && (
          <section className="cv-section mb-6">
            <h3 className="text-lg font-bold border-b mb-2 text-cyan-600">Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{cv.summary}</p>
          </section>
        )}

        {/* Featured Project */}
        {cv.featuredProject && (
          <section className="cv-section mb-6">
            <h3 className="text-lg font-bold border-b mb-2 text-cyan-600">Featured Project</h3>
            <div className="project-block">
              <h4 className="font-semibold text-gray-800">{cv.featuredProject.title}</h4>
              <p className="tech-stack text-xs text-gray-500 mb-1">
                {Array.isArray(cv.featuredProject.technologies)
                  ? cv.featuredProject.technologies.join(" | ")
                  : cv.featuredProject.technologies}
              </p>
              <p className="text-gray-700 text-sm">{cv.featuredProject.description}</p>
            </div>
          </section>
        )}

        {/* Work Experience */}
        {cv.workExperience?.length > 0 && (
          <section className="cv-section mb-6">
            <h3 className="text-lg font-bold border-b mb-2 text-cyan-600">Work Experience</h3>
            {cv.workExperience.map((exp, idx) => (
              <div key={idx} className="experience-block mb-3">
                <div className="exp-header flex justify-between items-center text-sm font-semibold">
                  <span>
                    • {exp.company} - {exp.role}
                  </span>
                  <span className="date-location text-xs text-gray-500 font-normal">
                    {exp.duration} - {exp.location}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skill & Tools */}
        {cv.skillAndTools && (
          <section className="cv-section mb-6">
            <h3 className="text-lg font-bold border-b mb-2 text-cyan-600">Skills & Tools</h3>
            <table className="skill-table w-full text-sm">
              <tbody>
                {cv.skillAndTools.languages?.length > 0 && (
                  <tr>
                    <td className="font-semibold py-1 pr-4 w-1/4">Languages</td>
                    <td className="py-1">
                      {Array.isArray(cv.skillAndTools.languages)
                        ? cv.skillAndTools.languages.join(", ")
                        : cv.skillAndTools.languages}
                    </td>
                  </tr>
                )}
                {cv.skillAndTools.frontend?.length > 0 && (
                  <tr>
                    <td className="font-semibold py-1 pr-4 w-1/4">Front-End</td>
                    <td className="py-1">
                      {Array.isArray(cv.skillAndTools.frontend)
                        ? cv.skillAndTools.frontend.join(", ")
                        : cv.skillAndTools.frontend}
                    </td>
                  </tr>
                )}
                {cv.skillAndTools.backend?.length > 0 && (
                  <tr>
                    <td className="font-semibold py-1 pr-4 w-1/4">Back-End</td>
                    <td className="py-1">
                      {Array.isArray(cv.skillAndTools.backend)
                        ? cv.skillAndTools.backend.join(", ")
                        : cv.skillAndTools.backend}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* Education */}
        {cv.education?.length > 0 && (
          <section className="cv-section mb-4">
            <h3 className="text-lg font-bold border-b mb-2 text-cyan-600">Education</h3>
            <ul className="education-list space-y-2 text-sm">
              {cv.education.map((edu, idx) => (
                <li key={idx}>
                  <strong>• {edu.institution}</strong> - ({edu.degree})
                  <br />
                  <span className="date-location text-xs text-gray-500">
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