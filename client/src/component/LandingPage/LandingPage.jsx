import React from 'react';
import './Land.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate=useNavigate()

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">ExamHub</h1>
          <nav className="nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2 className="hero-title">Revolutionize Your Exam Preparation</h2>
          <p className="hero-subtitle">
            With ExamHub, you can access a wide range of exams, track your progress, and improve your scores, all in one place.
          </p>
          <button className="cta-button" onClick={()=>{
            navigate('/stuadmin')
          }}>Get Started</button>
        </section>

        <section id="features" className="features">
          <h3 className="section-title">Why Choose ExamHub?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4 className="feature-title">Personalized Exams</h4>
              <p className="feature-description">
                Tailor your exams to focus on the topics you need to improve the most.
              </p>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Real-Time Analytics</h4>
              <p className="feature-description">
                Get instant feedback and detailed insights on your performance.
              </p>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Expert-Curated Questions</h4>
              <p className="feature-description">
                Practice with questions designed by industry experts and educators.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h3 className="section-title">About Us</h3>
          <p className="about-description">
            ExamHub is dedicated to providing an efficient and innovative platform for students and professionals to enhance their exam readiness. Our goal is to simplify the process of preparation by offering a seamless and user-friendly experience.
          </p>
        </section>

        <section id="contact" className="contact">
          <h3 className="section-title">Get in Touch</h3>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
            <textarea placeholder="Your Message" className="form-textarea"></textarea>
            <button type="submit" className="form-button">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 ExamHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;