import { useState, useMemo } from "react";
import { useGetSkillsQuery } from "../../redux/features/skill/skillApi";
// আপনার DynamicIcon কম্পোনেন্টটির সঠিক প্যাথ দিন
import DynamicIcon from "../../components/DynamicIcon"; 

const Skill = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Redux RTK Query দিয়ে ডাটা ফেচিং
  const { data: response, isLoading, isError } = useGetSkillsQuery();

  // ডাটা সেফলি এক্সট্র্যাক্ট ও মেমোরাইজ করা
  const skillList = useMemo(() => {
    const rawData = response?.data || response?.skill || response;
    return Array.isArray(rawData) ? rawData : [];
  }, [response]);

  // ডাইনামিক ক্যাটাগরি লিস্ট তৈরি
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(skillList.map((skill) => skill.category).filter(Boolean)),
    ];
  }, [skillList]);

  // নির্বাচিত ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skillList;
    return skillList.filter((skill) => skill.category === activeCategory);
  }, [skillList, activeCategory]);

  if (isLoading) {
    return (
      <div className="skill-loading text-center py-12 text-cyan-400">
        Loading Skills...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="skill-error text-center py-12 text-red-500">
        Failed to load skills. Please try again later.
      </div>
    );
  }

  return (
    <section className="skill-section" id="skill">
      <div className="skill-container">
        {/* Section Header */}
        <div className="skill-header">
          <div className="skill-badge">
            <span className="bracket top-left">┌</span>
            <span className="badge-text">My Technical Expertise</span>
            <span className="bracket bottom-right">┘</span>
          </div>
          <h2 className="skill-main-title">My Awesome Skills</h2>
        </div>

        {/* Dynamic Category Filter Buttons */}
        {categories.length > 1 && (
          <div className="skill-filter-buttons flex justify-center gap-3 my-6 flex-wrap">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Skill Grid Section */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No skills found in this category.
          </div>
        ) : (
          <div className="skill-grid">
            {filteredSkills.map((skill, index) => {
              const proficiency =
                skill?.proficiencyLevel ?? skill?.proficiency ?? 80;

              return (
                <div
                  className="skill-card-wrapper"
                  key={skill._id || skill.id || skill.slug || index}
                >
                  {/* Top Cut-Corner Skill Card */}
                  <div className="skill-card">
                    <div className="skill-icon-box">
                      {skill.icon ? (
                        <DynamicIcon
                          iconName={skill.icon}
                          size={32}
                          color="#3b82f6"
                        />
                      ) : (
                        <span className="fallback-text">
                          {skill.title?.charAt(0) || "S"}
                        </span>
                      )}
                    </div>
                    <div className="skill-percentage">{proficiency}%</div>
                  </div>

                  {/* Bottom Skill Title */}
                  <h4 className="skill-name">{skill.title}</h4>
                </div>
              );
            })}
          </div>
        )}

        {/* Resume Experience / Education Section */}
        <div className="resume-grid mt-16">
          {/* Educational Experience Box */}
          <div className="resume-folder-card">
            <div className="resume-folder-tab"></div>
            <div className="resume-content-box">
              <h3 className="resume-box-title">Educational Experience</h3>

              <div className="resume-list">
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-year">2000 - 2004</span>
                    <span className="resume-score">3.80/4</span>
                  </div>
                  <h4 className="resume-item-title">B.Sc (Pass)</h4>
                  <p className="resume-item-subtitle">National University</p>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-year">1999 - 2000</span>
                    <span className="resume-score">5.00/5</span>
                  </div>
                  <h4 className="resume-item-title">
                    Higher Secondary Certificate (HSC)
                  </h4>
                  <p className="resume-item-subtitle">
                    Science Academic Program
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Experience Box */}
          <div className="resume-folder-card">
            <div className="resume-folder-tab"></div>
            <div className="resume-content-box">
              <h3 className="resume-box-title">Job Experience</h3>

              <div className="resume-list">
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-year">2024 - Present</span>
                    <span className="resume-score">Running</span>
                  </div>
                  <h4 className="resume-item-title">Executive packaging</h4>
                  <p className="resume-item-subtitle">ACI Salt Limited</p>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-year">2023 - 2025</span>
                    <span className="resume-score">2 Years</span>
                  </div>
                  <h4 className="resume-item-title">Frontend Web Developer</h4>
                  <p className="resume-item-subtitle">Software & IT Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;