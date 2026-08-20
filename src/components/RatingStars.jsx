

const RatingStars = ({ 
  rating = 5,          // বর্তমান রেটিং ভ্যালু (যেমন: 4, 4.5, 5)
  maxStars = 5,        // মোট স্টারের সংখ্যা (ডিফল্ট: ৫)
  isInteractive = false, // ইউজার ক্লিক করতে পারবে কিনা (Form/Input-এর জন্য true)
  onRatingChange,      // রেটিং চেঞ্জ হলে কলব্যাক ফাংশন
  size = "18px",       // স্টারের সাইজ
  activeColor = "#ff9f43", // পূর্ণ স্টারের কালার
  inactiveColor = "#2a3158" // খালি স্টারের কালার
}) => {

  const handleClick = (selectedRating) => {
    if (isInteractive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        
        // ফুল স্টার, হাফ স্টার এবং খালি স্টার হিসাব করা
        const isFull = rating >= starValue;
        const isHalf = rating >= starValue - 0.5 && rating < starValue;

        return (
          <span
            key={index}
            onClick={() => handleClick(starValue)}
            style={{
              cursor: isInteractive ? "pointer" : "default",
              color: isFull || isHalf ? activeColor : inactiveColor,
              fontSize: size,
              userSelect: "none",
              transition: "color 0.2s ease",
            }}
          >
            {isHalf ? "★" : "★"} {/* চাইলে হাফ স্টারের জন্য অন্য চিহ্নও দিতে পারেন */}
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;