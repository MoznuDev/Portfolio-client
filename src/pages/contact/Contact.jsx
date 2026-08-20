import { useState } from "react";
import { Headphones, ArrowRight, Mail, MessageSquare } from "lucide-react";
import { useSendContactMessageMutation } from "../../redux/featurs/auth/contacts/contactApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sendMessage, { isLoading }] = useSendContactMessageMutation();
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await sendMessage(formData).unwrap();
      if (response.success) {
        setStatusMsg({
          type: "success",
          text: "Message sent successfully! Thank you.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <div className="contact-badge">
            <span className="bracket-left">[</span>
            <span className="badge-text">Contact With Me</span>
            <span className="bracket-right">]</span>
          </div>
          <h2 className="contact-title">My Contact Information</h2>
        </div>

        {/* Contact Content Grid */}
        <div className="contact-grid">
          {/* Left Form Box */}
          <div className="contact-form-card">
            <h3 className="form-heading">Send me a message</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Your Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              {statusMsg.text && (
                <div className={`form-status ${statusMsg.type}`}>
                  {statusMsg.text}
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                <span>{isLoading ? "Sending..." : "Send Message"}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="contact-info-card">
            {/* Get Support */}
            <div className="info-block">
              <div className="icon-wrapper">
                <Headphones size={20} className="info-icon" />
              </div>
              <h4 className="info-title">Get Support</h4>
              <p className="info-desc">
                If you want to communicate live, please reach out via phone or direct message.
              </p>
              <p className="info-detail">
                Phone Number: <a href="tel:01922222224">01922222224</a>
              </p>
              <p className="info-detail">
                Phone Number: <a href="tel:01956565654">01956565654</a>
              </p>
            </div>

            {/* Communication With Mail */}
            <div className="info-block">
              <div className="icon-wrapper">
                <Mail size={20} className="info-icon" />
              </div>
              <h4 className="info-title">Communication With Mail</h4>
              <p className="info-desc">
                Feel free to drop an email for project inquiries or collaborations.
              </p>
              <p className="info-detail">
                Email 01: <a href="mailto:admin@gmail.com">admin@gmail.com</a>
              </p>
              <p className="info-detail">
                Email 02: <a href="mailto:personal@gmail.com">personal@gmail.com</a>
              </p>
            </div>

            {/* Want to Chat Now */}
            <div className="info-block">
              <div className="icon-wrapper">
                <MessageSquare size={20} className="info-icon" />
              </div>
              <h4 className="info-title">Want to Chat Now?</h4>
              <p className="info-desc">
                Connect with me to discuss new ideas and technical solutions.
              </p>
              <button className="chat-btn">
                <span>Open Chat With Me</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;