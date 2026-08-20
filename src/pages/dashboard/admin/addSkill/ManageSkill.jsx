import { useState, useEffect } from "react";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import UpdateSkill from "./UpdateSkill";

// ডাইনামিক রিয়েক্ট আইকন কম্পোনেন্ট
const DynamicIcon = ({ name }) => {
  if (!name) return <span>N/A</span>;
  const IconComponent = FaIcons[name];
  return IconComponent ? <IconComponent size={22} /> : <span>{name}</span>;
};

const ManageSkill = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // ১. সব স্কিল ডাটা ফেচ করা
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/skills");
      const result = await res.json();

      // ব্যাকএন্ড Response structure অনুযায়ী safe extract
      if (Array.isArray(result)) {
        setSkills(result);
      } else if (result.success && Array.isArray(result.data)) {
        setSkills(result.data);
      } else if (result.data && Array.isArray(result.data.result)) {
        setSkills(result.data.result);
      } else {
        setSkills([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ২. ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success || res.ok) {
        alert("Skill deleted successfully!");
        fetchSkills();
      } else {
        alert("Delete failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // UpdateSkill ফর্মে সুইচ
  if (selectedSkill) {
    return (
      <UpdateSkill
        skill={selectedSkill}
        onBack={() => setSelectedSkill(null)}
        onUpdateSuccess={() => {
          setSelectedSkill(null);
          fetchSkills();
        }}
      />
    );
  }

  return (
    <div className="manage-container">
      <h2>Manage Skills</h2>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  Loading skills...
                </td>
              </tr>
            ) : skills.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No Skills found.
                </td>
              </tr>
            ) : (
              skills.map((skill) => {
                // Backend Schema compatibility check
                const level = skill.proficiencyLevel ?? skill.proficiency ?? 0;
                
                return (
                  <tr key={skill._id || skill.id}>
                    <td className="icon-cell">
                      <DynamicIcon name={skill.icon} />
                    </td>
                    <td>
                      <strong>{skill.title}</strong>
                    </td>
                    <td>
                      <span className="badge category-badge">
                        {skill.category || "Frontend"}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar-wrap">
                        <span>{level}%</span>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${level}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code>{skill.slug || "N/A"}</code>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => setSelectedSkill(skill)}
                          className="edit-btn"
                        >
                          <RiEditBoxLine /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id || skill.id)}
                          className="delete-btn"
                        >
                          <RiDeleteBin6Line /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkill;