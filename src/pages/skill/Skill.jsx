import { useGetSkillsQuery } from "../../redux/features/skill/skillApi";
import DynamicIcon from "../../components/DynamicIcon"; // 💡 ১. DynamicIcon ইম্পোর্ট করুন

const Skill = () => {
  // Redux RTK Query দিয়ে Skills ডাটা ফেচ করা
  const { data: response, isLoading, isError } = useGetSkillsQuery();

  if (isLoading) {
    return <div className="skills-loading">Loading Skills...</div>;
  }

  if (isError) {
    return <div className="skills-error">Failed to load skills.</div>;
  }

  // ডাটাবেজ অবজেক্ট সেফলি হ্যান্ডেল করা
  const rawData = response?.data || response?.skills || response;
  const skillList = Array.isArray(rawData) ? rawData : [];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <div className="skills-badge">
            <span className="bracket top-left">┌</span>
            <span className="badge-text">My Awesome Skills</span>
            <span className="bracket bottom-right">┘</span>
          </div>
          <h2 className="skills-main-title">My Awesome Skills</h2>
        </div>

        {/* Skills Grid Section */}
        <div className="skills-grid">
          {skillList.map((skill, index) => (
            <div
              className="skill-card-wrapper"
              key={skill._id || skill.id || skill.slug || index}
            >
              {/* Top Cut-Corner Skill Card */}
              <div className="skill-card">
                <div className="skill-icon-box">
                  {/* 💡 ২. img ট্যাগের পরিবর্তে DynamicIcon ব্যবহার করা হয়েছে */}
                  {skill.icon ? (
                    <DynamicIcon
                      iconName={skill.icon}
                      size={32}
                      color="#3b82f6"
                    />
                  ) : (
                    <span className="fallback-text">
                      {skill.title?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="skill-percentage">
                  {skill.proficiencyLevel
                    ? `${skill.proficiencyLevel}%`
                    : skill.proficiency
                      ? `${skill.proficiency}%`
                      : "80%"}
                </div>
              </div>
              {/* Bottom Skill Title */}
              <h4 className="skill-name">{skill.title}</h4>
            </div>
          ))}
        </div>

        {/* Resume Experience / Education Section */}
        <div className="resume-grid">
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
