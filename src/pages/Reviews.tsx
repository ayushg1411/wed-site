import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './Reviews.css';

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  date: string;
  location: string;
  avatar: string;
}

export const Reviews: React.FC = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya & Arjun",
      rating: 5,
      review: "Absolutely stunning! The video invitation exceeded our expectations. The attention to detail and the beautiful animations made our wedding invitation truly special. Our guests were amazed!",
      date: "2 weeks ago",
      location: "Mumbai, India",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Sneha & Vikram",
      rating: 5,
      review: "The team at Gathbandhan created magic! Our video invitation was elegant, personalized, and captured our love story perfectly. Highly recommend their services!",
      date: "1 month ago",
      location: "Delhi, India",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Ananya & Rohit",
      rating: 5,
      review: "Professional service and beautiful results! The video invitation was delivered on time and looked absolutely gorgeous. Our families loved it!",
      date: "3 weeks ago",
      location: "Bangalore, India",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      name: "Kavya & Aditya",
      rating: 4,
      review: "Great experience working with Gathbandhan. The video quality was excellent and the design was exactly what we wanted. Very satisfied with the service!",
      date: "1 week ago",
      location: "Chennai, India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 5,
      name: "Riya & Karan",
      rating: 5,
      review: "Outstanding work! The video invitation was creative, elegant, and perfectly captured our wedding theme. The team was responsive and professional throughout.",
      date: "2 months ago",
      location: "Pune, India",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 6,
      name: "Meera & Sanjay",
      rating: 5,
      review: "Incredible attention to detail! Our video invitation was a masterpiece. The animations, music, and overall design were perfect. Thank you for making our day special!",
      date: "3 months ago",
      location: "Hyderabad, India",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ]);

  const [stats] = useState({
    totalReviews: 150,
    averageRating: 4.9,
    fiveStars: 92,
    fourStars: 6,
    threeStars: 1,
    twoStars: 1,
    oneStars: 0
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`star ${index < rating ? 'star--filled' : 'star--empty'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ));
  };

  return (
    <div className="reviews-page">
      <Header />
      
      {/* Hero Section */}
      <div className="reviews-hero">
        <div className="reviews-hero__content">
          <h1 className="reviews-hero__title">What Our Couples Say</h1>
          <p className="reviews-hero__subtitle">
            Real stories from real couples who trusted us with their special day
          </p>
          
          <div className="reviews-hero__stats">
            <div className="stat-item">
              <div className="stat-number">{stats.averageRating}</div>
              <div className="stat-stars">{renderStars(5)}</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.totalReviews}+</div>
              <div className="stat-label">Happy Couples</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-content">
        <div className="reviews-container">
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card__header">
                  <div className="review-card__info">
                    <h3 className="review-card__name">{review.name}</h3>
                    <div className="review-card__meta">
                      <span className="review-card__location">{review.location}</span>
                      <span className="review-card__date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-card__rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="review-card__content">
                  <p className="review-card__text">{review.review}</p>
                </div>
                
                <div className="review-card__footer">
                  <div className="review-card__verified">
                    <svg className="verified-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                    </svg>
                    <span>Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
