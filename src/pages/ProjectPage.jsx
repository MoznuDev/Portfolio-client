import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaFolder, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetProjectsQuery } from '../redux/featurs/project/projectsApi';

const ProjectsPage = () => {
  // RTK Query কল
  const { data: response, isLoading, isError, error } = useGetProjectsQuery();

  // 🔍 ডাটাবেজের রেসপন্স থেকে সঠিকভাবে Array বের করার লজিক
  let projects = [];

  if (response) {
    if (Array.isArray(response)) {
      projects = response; // যদি সরাসরি অ্যারে আসে
    } else if (Array.isArray(response.data)) {
      projects = response.data; // যদি { data: [...] } ফরমেটে আসে
    } else if (Array.isArray(response.projects)) {
      projects = response.projects; // যদি { projects: [...] } ফরমেটে আসে
    } else if (Array.isArray(response.result)) {
      projects = response.result; // যদি { result: [...] } ফরমেটে আসে
    }
  }

  // ১. লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // ২. এরর স্টেট
  if (isError) {
    return (
      <div className="text-center py-12 text-red-400">
        <p className="text-lg font-semibold">Failed to load projects!</p>
        <p className="text-sm text-gray-400 mt-1">
          {error?.data?.message || error?.error || 'Something went wrong.'}
        </p>
      </div>
    );
  }

  // ৩. ডাটা না থাকলে (Empty State)
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No projects found in the database.</p>
      </div>
    );
  }

  return (
    <div className="projects-container py-16 px-4 max-w-7xl mx-auto">
      
      {/* 💡 Title Section-এ মার্জিন ও প্যাডিং বাড়িয়ে গ্যাপ তৈরি করা হলো */}
      <div className="text-center mb-16 pt-6">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 tracking-wide">
          All Projects
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-3">
          Explore all of my recent work and development applications
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const projectId = project?._id || project?.id;

          const imageUrl = project?.projectImage || project?.image || project?.thumbnail;
          const liveUrl = project?.liveUrl || project?.liveLink || project?.live;
          const githubClient = project?.githubClient || project?.githubLink;
          const githubServer = project?.githubServer;

          const reviews = Array.isArray(project?.reviews) ? project.reviews : [];
          const totalReviews = reviews.length > 0 ? reviews.length : (Number(project?.numReviews) || 0);

          const avgRating = reviews.length > 0
            ? (reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / reviews.length).toFixed(1)
            : Number(project?.rating || 0).toFixed(1);

          return (
            <div
              key={projectId || index}
              className="project-card border border-gray-700 rounded-lg bg-gray-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg overflow-hidden"
            >
              <div>
                {/* 🖼️ Project Image Container */}
                <div className="relative group h-48 w-full bg-gray-900 overflow-hidden">
                  <Link to={projectId ? `/projects/${projectId}` : '#'}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project?.title || 'Project Image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <FaFolder className="text-4xl" />
                      </div>
                    )}
                  </Link>

                  {/* GitHub Links */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {githubClient && (
                      <a
                        href={githubClient}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 p-2.5 rounded-full text-white hover:text-cyan-400 transition-colors"
                        title="GitHub Client Code"
                      >
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                    {githubServer && (
                      <a
                        href={githubServer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 p-2.5 rounded-full text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="GitHub Server Code"
                      >
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {/* Category & Status */}
                  <div className="flex justify-between items-center mb-2">
                    {project.category && (
                      <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium">
                        {project.category}
                      </span>
                    )}
                    {project.status && (
                      <span className="text-xs text-gray-400 capitalize bg-gray-700/50 px-2 py-0.5 rounded">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link to={projectId ? `/projects/${projectId}` : '#'}>
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1 hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h2>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded border border-cyan-800/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Rating & Live Link Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-700/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-xs font-semibold text-white">
                    {totalReviews > 0 ? avgRating : 'New'}
                  </span>
                  {totalReviews > 0 && (
                    <span className="text-[11px] text-gray-400">
                      ({totalReviews})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-300 hover:text-cyan-400 flex items-center gap-1 transition-colors font-medium"
                      title="Live Preview"
                    >
                      <FaExternalLinkAlt className="text-[10px]" /> Live
                    </a>
                  )}

                  {projectId && (
                    <Link
                      to={`/projects/${projectId}`}
                      className="text-xs text-cyan-400 hover:underline font-medium"
                    >
                      Details →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;