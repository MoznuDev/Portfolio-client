import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetReviewsQuery } from "../../redux/features/reviews/reviewApi";
import RatingStars from "../../components/RatingStars";

// Swiper Essential CSS
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const { data: response, isLoading, isError } = useGetReviewsQuery();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) return <div className="testi-loading">Loading Reviews...</div>;
  if (isError)
    return <div className="testi-error">Failed to load reviews.</div>;

  const reviewsList = Array.isArray(response)
    ? response
    : response?.reviews || response?.data || [];

  // Average Rating Calculation
  const avgRating = reviewsList.length
    ? (
        reviewsList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) /
        reviewsList.length
      ).toFixed(1)
    : "4.5";

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Top Header Row with Right Side Text */}
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

        {/* Main Section Content: Left Static Banner + Right Swiper */}
        <div className="testimonials-content-grid">
          {/* Left Static Banner Card */}
          <div className="left-banner-card">
            <div className="banner-content">
              <h3 className="avg-rating-num">{avgRating}</h3>
              <p className="avg-subtext">
                Average 500+ Reviews in My portfolio.
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
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                ref={nextRef}
                className="nav-btn next-btn"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          {/* Right Swiper Carousel */}
          <div className="right-swiper-wrapper">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={reviewsList.length > 2}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                // Mobile Portrait: 1 Card
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                // Tablet/IPad: 2 Cards
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // Desktop: 2 Cards
                1200: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              className="mySwiper"
            >
              {reviewsList.map((item) => {
                const currentRating = Number(item.rating) || 5;

                return (
                  <SwiperSlide key={item._id || item.id}>
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
                        {item.review || item.reviewMessage}
                      </p>

                      <div className="client-info">
                        <img
                          src={
                            item.clientImage ||
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                          }
                          alt={item.clientName || "Client"}
                          className="client-avatar"
                        />
                        <div className="client-details">
                          <h4 className="client-name">{item.clientName}</h4>
                          <p className="client-role">
                            {item.clientDesignation}{" "}
                            {item.company ? `at ${item.company}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
