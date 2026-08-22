import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper Style Imports
import "swiper/css";
import "swiper/css/navigation";
import { useGetFeaturedReviewsQuery } from "../../redux/features/reviews/reviewApi";
import RatingStars from "../../components/RatingStars";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

const Testimonials = () => {
  const { data: response, isLoading, isError, error } = useGetFeaturedReviewsQuery();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Safe Data Extraction
  const reviewsList = Array.isArray(response)
    ? response
    : response?.reviews || response?.data || [];

  // Average Rating Calculation
  const avgRating = reviewsList.length
    ? (
        reviewsList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) /
        reviewsList.length
      ).toFixed(1)
    : "5.0";

  if (isLoading) {
    return (
      <div className="testi-loading text-center py-12 text-cyan-400 font-semibold">
        Loading Reviews...
      </div>
    );
  }

  if (isError) {
    console.error("Testimonials Fetch Error:", error);
    return (
      <div className="testi-error text-center py-12 text-red-500 font-semibold">
        Failed to load reviews. Please try again later.
      </div>
    );
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Top Header Row */}
        <div className="testimonials-header-row">
          <div className="header-left">
            <div className="badge-wrapper">
              <span className="bracket">[</span>
              <span className="badge-text">My Clients Review</span>
              <span className="bracket">]</span>
            </div>
            <h2 className="main-title">My Clients Review</h2>
          </div>

          <div className="header-right">
            <p>
              Throughout the project, communication with your team was seamless
              and efficient. I appreciated the regular updates and prompt
              response.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="testimonials-content-grid">
          {/* Left Static Banner Card */}
          <div className="left-banner-card">
            <div className="banner-content">
              <h3 className="avg-rating-num">{avgRating}</h3>
              <p className="avg-subtext">
                Average {reviewsList.length}+ Reviews in My portfolio.
              </p>
              <p className="avg-subtext">
                This review will be impressed to You.
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="slider-nav-btns">
              <button
                ref={prevRef}
                className="nav-btn prev-btn"
                aria-label="Previous Review"
              >
                ‹
              </button>
              <button
                ref={nextRef}
                className="nav-btn next-btn"
                aria-label="Next Review"
              >
                ›
              </button>
            </div>
          </div>

          {/* Right Swiper Carousel */}
          <div className="right-swiper-wrapper">
            {reviewsList.length === 0 ? (
              <div className="no-reviews text-gray-400 py-8 text-center">
                No reviews found yet.
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={reviewsList.length > 2}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onBeforeInit={(swiper) => {
                  // Custom navigation ref binding fix
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                onInit={(swiper) => {
                  // Init navigation after DOM elements are mounted
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 16 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 2, spaceBetween: 24 },
                }}
                className="mySwiper"
              >
                {reviewsList.map((item, idx) => {
                  const currentRating = Number(item.rating) || 5;

                  return (
                    <SwiperSlide key={item._id || item.id || idx}>
                      <div className="testimonial-card">
                        <div className="card-top">
                          <div className="rating-box">
                            <span className="rating-number">
                              {currentRating.toFixed(1)}
                            </span>
                            <RatingStars
                              rating={currentRating}
                              size="16px"
                              activeColor="#ff9f43"
                              inactiveColor="#2a3158"
                            />
                          </div>
                          <div className="quote-icon">“</div>
                        </div>

                        <p className="review-text">
                          {item.review || item.reviewMessage || item.comment}
                        </p>

                        <div className="client-info">
                          <img
                            src={
                              item.clientImage ||
                              item.avatar ||
                              DEFAULT_AVATAR
                            }
                            alt={item.clientName || "Client"}
                            className="client-avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = DEFAULT_AVATAR;
                            }}
                          />
                          <div className="client-details">
                            <h4 className="client-name">
                              {item.clientName ||
                                item.name ||
                                "Anonymous Client"}
                            </h4>
                            <p className="client-role">
                              {item.clientDesignation || item.designation || "Client"}
                              {item.company ? ` at ${item.company}` : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;