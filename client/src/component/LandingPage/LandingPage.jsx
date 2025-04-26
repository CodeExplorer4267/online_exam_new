import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Land.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/stuadmin');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission later
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">ExamSphere</h1>
          <nav className="nav">
            <Link to="#features" className="nav-link">Features</Link>
            <Link to="#about" className="nav-link">About</Link>
            <Link to="#contact" className="nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2 className="hero-title">Revolutionize Your Exam Preparation</h2>
          <p className="hero-subtitle">
            With ExamSphere, you can access a wide range of exams, track your progress, and improve your scores, all in one place.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </section>

        <section id="features" className="features">
          <h3 className="section-title">Why Choose ExamSphere?</h3>
          <div className="features-grid">
            {[
              {
                title: "Personalized Exams",
                description: "Tailor your exams to focus on the topics you need to improve the most.",
              },
              {
                title: "Real-Time Analytics",
                description: "Get instant feedback and detailed insights on your performance.",
              },
              {
                title: "Expert-Curated Questions",
                description: "Practice with questions designed by industry experts and educators.",
              }
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h3 className="section-title">About Us</h3>
          <p className="about-description">
            ExamSphere is dedicated to providing an efficient and innovative platform for students and professionals to enhance their exam readiness. Our goal is to simplify the process of preparation by offering a seamless and user-friendly experience.
          </p>
        </section>

        <section id="contact" className="contact">
          <h3 className="section-title">Get in Touch</h3>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" placeholder="Your Name" className="form-input" required />
            <input type="email" placeholder="Your Email" className="form-input" required />
            <textarea placeholder="Your Message" className="form-textarea" required></textarea>
            <button type="submit" className="form-button">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 ExamSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// a tags with href="#..." cause full page reloads sometimes → use Link from react-router-dom for smooth scroll/spa behavior.

// onClick for navigation is fine but better to use a separate function (readable).

// The form has no preventDefault, so clicking "Send" will reload page (bad UX).

// Minor typo: In footer it says ExamHub instead of ExamSphere.

// Structure could be a bit more semantic and split into smaller components if it grows.

// Accessibility: add htmlFor on labels (currently missing) if you expand the form later.