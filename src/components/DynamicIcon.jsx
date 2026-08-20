import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";

const DynamicIcon = ({ iconName, size = 24, color = "#3b82f6", className = "" }) => {
  // ১. মেমোইজেশন ব্যবহার করে পারফর্ম্যান্স অপটিমাইজেশন
  const IconComponent = useMemo(() => {
    if (!iconName) return null;
    
    const cleanName = String(iconName).trim();
    
    // ক্রমান্বয়ে আইকন প্যাকেজ ম্যাচিং
    return (
      FaIcons[cleanName] ||
      SiIcons[cleanName] ||
      BiIcons[cleanName] ||
      TbIcons[cleanName] ||
      FaIcons.FaCode // Fallback Icon
    );
  }, [iconName]);

  if (!iconName) return null;

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ display: "inline-flex", color }}
      aria-hidden="true"
    >
      <IconComponent size={size} color="currentColor" />
    </span>
  );
};

// ২. প্রোফেশনাল টাইপ সেফটির জন্য PropTypes
DynamicIcon.propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(DynamicIcon);