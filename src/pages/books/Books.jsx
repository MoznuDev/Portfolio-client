import DynamicIcon from "../../components/DynamicIcon";

const Books = () => {
  const booksList = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Software Engineering",
      status: "Completed",
      rating: 5,
      description:
        "A handbook of agile software craftsmanship focusing on writing clean, readable, and maintainable code.",
      coverColor: "#2563eb",
    },
    {
      id: 2,
      title: "You Don't Know JS Yet",
      author: "Kyle Simpson",
      category: "JavaScript",
      status: "Completed",
      rating: 5,
      description:
        "An in-depth book series diving deep into the core mechanisms and tricky concepts of JavaScript.",
      coverColor: "#eab308",
    },
    {
      id: 3,
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      category: "System Design",
      status: "Reading",
      rating: 5,
      description:
        "Key concepts behind distributed systems, data storage, scalability, and backend architecture.",
      coverColor: "#059669",
    },
  ];

  return (
    <section className="books-section" id="books">
      <div className="books-container">
        {/* Section Header */}
        <div className="books-header">
          <span className="books-badge">Knowledge & Learning</span>
          <h2 className="books-main-title">Books I Recommend</h2>
          <p className="books-sub-title">
            A curated list of books that shaped my software engineering mindset
            and core technical skill.
          </p>
        </div>

        {/* Books Cards Grid */}
        <div className="books-grid">
          {booksList.map((book) => (
            <div className="book-card" key={book.id}>
              {/* Card Top / Status & Category */}
              <div className="book-card-header">
                <span className="book-category">{book.category}</span>
                <span
                  className={`book-status ${
                    book.status === "Completed" ? "completed" : "reading"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              {/* Book Info Section */}
              <div className="book-content">
                <div
                  className="book-icon-wrapper"
                  style={{ backgroundColor: `${book.coverColor}15` }}
                >
                  <DynamicIcon
                    iconName="FaBookOpen"
                    size={24}
                    color={book.coverColor}
                  />
                </div>

                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">By {book.author}</p>
                </div>
              </div>

              <p className="book-description">{book.description}</p>

              {/* Card Footer / Rating */}
              <div className="book-card-footer">
                <span className="rating-label">Rating:</span>
                <div className="stars-container">
                  {[...Array(book.rating)].map((_, i) => (
                    <DynamicIcon
                      key={i}
                      iconName="FaStar"
                      size={14}
                      color="#f59e0b"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
