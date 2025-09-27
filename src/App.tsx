import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { VideoGrid } from './components/VideoGrid';
import { OrderPage } from './pages/OrderPage';
import { AuthProvider } from './contexts/AuthContext';
import CategoryComponent from './categories/CategoryComponent';
import { ImageCarousel } from './components/ImageCarousel/ImageCarousel';
import { ContactUs } from './pages/ContactUs';

import { EngagementVideos, MehandiVideos, MuslimWeddingVideos, SangeetVideos, SaveTheDateVideos, VideosTitle, WeddingVideos } from './constatnts/VideosData';
import { carouselImages } from './constants/CarouselData';
import { Reviews } from './pages/Reviews';
import WhatsappButton from './components/Footer/WhatsappButton';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import TermsOfService from './pages/TermsOfService';
import FAQPage from './pages/FAQ';
function HomePage() {

  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing email:', email);
    try {
      const urlEncodedBody = new URLSearchParams({
        mobile: email

      }).toString();
      setEmail('');
      const url =
        'https://script.google.com/macros/s/AKfycbw3qWnG_CXmO2Jv7YJg486I7u5Z0nS5lyin6-4FSvf8UxuYAPztaSlWmQ39Wm8vELLD/exec'

      const response = await fetch(url, {
        method: 'POST',
        body: urlEncodedBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {

        setEmail(
          ''
        );
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

    } finally {
      setEmail('');
    }

  };
  return (
    <>
     

      {/* Main Hero Section */}
      <section className="main-hero">
        <div className="main-hero__container">
          <div className="main-hero__content">
            <div className="main-hero__text">
              <h1 className="main-hero__title ">
            <span className='main-hero__title--first'>Forever Starts Today</span>    
                <span className="main-hero__title-highlight">Get Your Dream Invite</span>
              </h1>
                  <div className="main-hero__visual--phone">
              <div className="hero-card hero-card--main">
                <img 
                  src="https://i.pinimg.com/1200x/47/6d/db/476ddbbaf91065f93ad0f6888e50e9dc.jpg" 
                  alt="Beautiful wedding invitation design"
                />
                <div className="hero-card__overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="hero-card hero-card--floating hero-card--1">
                <img 
                       src="https://i.pinimg.com/1200x/c6/33/08/c6330889843a621175437e93dfa2bdc2.jpg" 
                  alt="Wedding couple"
                />
              </div>
              
              <div className="hero-card hero-card--floating hero-card--2">
                <img 
               src="https://i.pinimg.com/736x/aa/82/25/aa8225f3b316f9dde4fbbb9059289bb2.jpg" 
                  alt="Wedding rings"
                />
              </div>
            </div>
              <p className="main-hero__description">
               Ditch the traditional invites—bring your big day to life with a wedding invitation video!
Showcase your love story with a personalized video clips, heartfelt text, and the perfect soundtrack. It's a unique, unforgettable way to invite your guests and set the tone for your celebration.
              </p>

              <div className="main-hero__features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 12h7v1.5h-7m0-2.5h7V9h-7m0-2.5h7V5h-7M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
                    </svg>
                  </div>
                  <span>Instant Delivery</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span>100+ Designs</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                  </div>
                  <span>Multi Category</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Best Quality</span>
                </div>
              </div>

              {/* <div className="main-hero__actions">
                <button className="btn btn--primary">Start Designing</button>
                <button className="btn btn--secondary">See Templates</button>
              </div> */}
            </div>

            <div className="main-hero__visual">
              <div className="hero-card hero-card--main">
                <img 
                  src="https://i.pinimg.com/1200x/47/6d/db/476ddbbaf91065f93ad0f6888e50e9dc.jpg" 
                  alt="Beautiful wedding invitation design"
                />
                <div className="hero-card__overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="hero-card hero-card--floating hero-card--1">
                <img 
                  src="https://i.pinimg.com/1200x/c6/33/08/c6330889843a621175437e93dfa2bdc2.jpg" 
                  alt="Wedding couple"
                />
              </div>
              
              <div className="hero-card hero-card--floating hero-card--2">
                <img 
                  src="https://i.pinimg.com/736x/aa/82/25/aa8225f3b316f9dde4fbbb9059289bb2.jpg" 
                  alt="Wedding rings"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

       <ImageCarousel
        images={carouselImages}
        autoScrollInterval={5000}
        showDots={true}
        showArrows={false}
      />
 <WhatsappButton phoneNumber='7017835443'/>
     {
      WeddingVideos.length > 2 && <VideoGrid
        videos={WeddingVideos.slice(0, 6)}
        title={VideosTitle.weddingVideos}
      />
     }
     {
      EngagementVideos.length > 2 && <VideoGrid
        videos={EngagementVideos.slice(0, 3)}
        title={VideosTitle.engagementVideos}
      />
     }
     {
      MuslimWeddingVideos.length > 2 && <VideoGrid
        videos={MuslimWeddingVideos.slice(0, 3)}
        title={VideosTitle.muslimWeddingVideos}
      />
     }
     {
      SaveTheDateVideos.length > 2 && <VideoGrid
        videos={SaveTheDateVideos.slice(0, 3)}
        title={VideosTitle.saveTheDateVideos}
      />
     }
     {
      MehandiVideos.length > 2 && <VideoGrid
        videos={MehandiVideos.slice(0, 3)}
        title={VideosTitle.mehandiVideos}
      />
     }
     {
      SangeetVideos.length > 2 && <VideoGrid
        videos={SangeetVideos.slice(0, 3)}
        title={VideosTitle.sangeetVideos}
      />
     }
     
      <div className="explore-categories-banner">
  <div className="explore-categories-content">
   
    <div className='explore-categories-text'>
      <h2 className="explore-categories-title">Explore Categories</h2>
      <p className="explore-categories-desc">Find the perfect invitation style for every celebration!</p>
    </div>
    <a href="/category/wedding-invites" className="explore-categories-btn">
      Browse Now <span style={{ marginTop:'0.3rem', marginLeft: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
</span>
    </a>
  </div>
</div>
      <div className="footer__newsletter">
        <div className="footer__newsletter-container">
          <div className="footer__newsletter-left">
            <div className="footer__newsletter-content">
              <h2 className="footer__newsletter-title">Get in Touch</h2>
              <p className="footer__newsletter-subtitle">contact us for the best wedding invitations video</p>
            </div>

            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="text"
                placeholder="Enter your number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer__newsletter-input"
                required
              />
              <button type="submit" className="footer__newsletter-button">
                Subscribe
              </button>
            </form>

            <p className="footer__newsletter-note">
              We'll contact you within 24 hours to discuss your perfect wedding invitation design.
            </p>
          </div>

          <div className="footer__newsletter-right">
            <div className="footer__newsletter-image">
              <img
                  src="https://i.pinimg.com/736x/ee/c2/9a/eec29a9e1144e2eed18231ee0871bf40.jpg" 
                alt="Wedding invitation design"
                className="newsletter-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Categories Banner */}


    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order/:videoId" element={<OrderPage />} />
              <Route path="/category/:category" element={<CategoryComponent />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
