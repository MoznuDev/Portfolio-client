import { Link } from 'react-router-dom'; 
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram, 
  FaGithub, 
  FaGlobe 
} from 'react-icons/fa';
import { HiDownload, HiArrowDown } from 'react-icons/hi';
import { useGetHeroBannerQuery } from '../../redux/featurs/hero/heroBannerApi';
import ViewProject from '../../components/ViewProject';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop";

const renderSocialIcon = (platform) => {
  const name = typeof platform === 'string' ? platform.toLowerCase() : '';
  if (name.includes('facebook') || name.includes('fb')) return <FaFacebookF />;
  if (name.includes('linkedin')) return <FaLinkedinIn />;
  if (name.includes('twitter') || name.includes('x')) return <FaTwitter />;
  if (name.includes('instagram')) return <FaInstagram />;
  if (name.includes('github')) return <FaGithub />;
  return <FaGlobe />;
};

const HeroBanner = () => {
  const { data: response, isLoading, isError, error } = useGetHeroBannerQuery();

  // লোডিং স্টেট
  if (isLoading) {
    return <div className="hero-loading">Loading Banner Data...</div>;
  }

  // এরর স্টেট
  if (isError) {
    console.error("Hero Banner API Error:", error);
    return <div className="hero-error">Error loading data from database.</div>;
  }

  // API Response থেকে Data সামঞ্জস্যকরণ
  const rawData = response?.data ?? response;
  const heroData = Array.isArray(rawData) ? rawData[0] : (rawData && typeof rawData === 'object' ? rawData : null);

  if (!heroData) {
    return <div className="hero-empty">No Hero Data Found in Database</div>;
  }

  // ডাটাবেজ ফিল্ড Fallbacks
  const subtitle = heroData.subtitle || heroData.welcomeBadge;
  
  const imageSrc = 
    (heroData.imageUrl && heroData.imageUrl.trim() !== "" && heroData.imageUrl) ||
    (heroData.image && heroData.image.trim() !== "" && heroData.image) ||
    (heroData.avatarUrl && heroData.avatarUrl.trim() !== "" && heroData.avatarUrl) ||
    (heroData.heroImage && heroData.heroImage.trim() !== "" && heroData.heroImage) ||
    DEFAULT_AVATAR;
  
  const primaryText = 
    heroData.primaryBtnText || 
    heroData.primaryBtn || 
    heroData.greetingBtnText || 
    "View Projects";

  const primaryLink = 
    heroData.primaryBtnLink || '/projects';

  const secondaryText = 
    heroData.secondaryBtnText ||
    heroData.secondaryBtn || 
    heroData.downloadCvText ||
    "Resume"; // Fallback text

  return (
    <section className="hero-wrapper">
      <div className="hero-card-container">
        
        {/* Glow Effects */}
        <div className="hero-glow-left"></div>
        <div className="hero-glow-right"></div>

        {/* Left Side Content Area */}
        <div className="hero-left-content">
          
          {/* Subtitle Badge & Social Links */}
          <div className="hero-top-row">
            {subtitle && (
              <div className="welcome-badge-box">
                <span className="corner-bracket">┌</span>
                <span className="badge-text">{subtitle}</span>
                <span className="corner-bracket">┘</span>
              </div>
            )}

            {/* Social Icons Container */}
            <div className="social-icons-wrapper">
              {Array.isArray(heroData.socials) && heroData.socials.length > 0 ? (
                heroData.socials.map((item, index) => (
                  <a 
                    key={item._id || item.id || index} 
                    href={item.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title={item.platform || 'Social Link'}
                  >
                    {renderSocialIcon(item.platform)}
                  </a>
                ))
              ) : (
                <>
                  <a href="#" className="social-icon-btn" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" className="social-icon-btn" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" className="social-icon-btn" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className="social-icon-btn" aria-label="Instagram"><FaInstagram /></a>
                </>
              )}
            </div>
          </div>

          {/* Main Title Heading */}
          {heroData.title && (
            <h1 className="hero-main-title">
              <span className="highlight-cyan">{heroData.title}</span>
            </h1>
          )}

          {/* Description */}
          {heroData.description && (
            <p className="hero-description">{heroData.description}</p>
          )}

          {/* Action Buttons */}
          <div className="hero-action-buttons">
            {primaryText && (
              <ViewProject buttonText={primaryText} to={primaryLink} />
            )}

            {/* 👉 a ট্যাগ পরিবর্তন করে Link ব্যবহার করা হলো এবংclassName হুবহু আগেরটাই রাখা হয়েছে */}
            {secondaryText && (
              <Link 
                to="/resume" 
                className="btn-cyan-download"
              >
                <span>{secondaryText}</span>
                <HiDownload className="dl-icon" />
              </Link>
            )}
          </div>

          {/* Scroll Down */}
          <div className="hero-scroll-indicator">
            <span className="scroll-text">{heroData.scrollText || "Scroll Down"}</span>
            <a href="#projects-section" className="scroll-arrow-circle" aria-label="Scroll to Projects Section">
              <HiArrowDown />
            </a>
          </div>

        </div>

        {/* Right Side Image */}
        <div className="hero-right-image-area">
          <div className="orbit-circle-bg"></div>
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={heroData.title || "Hero Profile"} 
              className="hero-profile-img" 
              loading="eager"
            />
          ) : (
            <div className="hero-profile-placeholder">
              <span>No Image Available</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;