import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  // প্রজেক্টে আসা সকল রিভিউ থেকে গড় রেটিং হিসাব করা (যদি ব্যাকএন্ড থেকে না আসে)
  const reviews = project?.reviews || [];
  const avgRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : project?.rating || 0; // যদি ব্যাকএন্ড সরাসরি project.rating পাঠায়

  const totalReviews = reviews.length || project?.numReviews || 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all">
      {/* প্রজেক্টের ইমেজ */}
      {project.projectImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={project.projectImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* কার্ড কন্টেন্ট */}
      <div className="p-5">
        <span className="text-xs text-cyan-400 font-semibold uppercase">
          {project.category || "Web App"}
        </span>

        <h3 className="text-xl font-bold text-white mt-1 mb-2">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* 👈 কার্ডের নিচে রেটিং এবং স্টার প্রদর্শন */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-base">★</span>
            <span className="text-white font-semibold">
              {totalReviews > 0 ? avgRating : "New"}
            </span>
            {totalReviews > 0 && (
              <span className="text-gray-500 text-xs">({totalReviews})</span>
            )}
          </div>

          <Link
            to={`/projects/${project._id}`}
            className="text-cyan-400 text-sm font-medium hover:underline"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;