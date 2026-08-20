import { useRouteError, Link } from 'react-router-dom';
import { HiHome, HiRefresh, HiExclamationCircle } from 'react-icons/hi';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="error-container">
      <div className="error-card">
        {/* Background Radial Glow */}
        <div className="error-glow"></div>

        {/* Status Badge */}
        <div className="error-badge">
          <HiExclamationCircle className="badge-icon" />
          <span>Error Occurred</span>
        </div>

        {/* 404 Visual Heading */}
        <h1 className="error-code">
          4<span className="glow-text">0</span>4
        </h1>

        <h2 className="error-title">Oops! Page Not Found</h2>
        
        <p className="error-message">
          {error?.statusText || error?.message || "আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল টাইপ করা হয়েছে।"}
        </p>

        {/* Action Buttons Group */}
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <HiHome className="btn-icon" />
            <span>Go To Home</span>
          </Link>

          <button onClick={() => window.location.reload()} className="btn btn-outline">
            <HiRefresh className="btn-icon" />
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;