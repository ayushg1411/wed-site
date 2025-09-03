import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './ContactUs.css';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const urlEncodedBody = new URLSearchParams({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email || ''
      }).toString();

      const url = 'https://script.google.com/macros/s/AKfycbzEbmdBfdRQiHn2WGsKiLFIMR8g7bEV2ipWg4SHT9aDl7vCCo5NJSuUN4OARMK1nwj4/exec'
      const response = await fetch(url, {
        method: 'POST',
        body: urlEncodedBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We\'ll get back to you soon.');
        setFormData({ name: '', mobile: '', email: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-hero">
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Get in Touch</h1>
          <p className="contact-hero__subtitle">
            Ready to create your perfect wedding invitation? We'd love to hear from you!
          </p>
        </div>
        <div className="contact-hero__image">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
            alt="Contact us" 
            className="hero-image"
          />
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-container">
          <div className="contact-info">
            <h2 className="contact-info__title">Let's Create Something Beautiful Together</h2>
            <p className="contact-info__description">
              Whether you have questions about our services, need a custom design, or want to discuss your wedding vision, 
              we're here to help make your special day even more memorable.
            </p>
            
            <div className="contact-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>Quick Response</h3>
                  <p>We'll get back to you within 24 hours</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>Premium Quality</h3>
                  <p>Beautiful designs crafted with love</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>Personal Touch</h3>
                  <p>Customized to match your unique style</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Send us a Message</h3>
              
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email (optional)"
                />
              </div>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get in Touch'}
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
