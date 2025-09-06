import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';
import './Reviews.css';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  city: string;
  created_at: string;
  video_title?: string;
  video_id?: string;
}

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const [stats] = useState({
    totalReviews: reviews.length,
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 4.9,
    fiveStars: reviews.filter(r => r.rating === 5).length,
    fourStars: reviews.filter(r => r.rating === 4).length,
    threeStars: reviews.filter(r => r.rating === 3).length,
    twoStars: reviews.filter(r => r.rating === 2).length,
    oneStars: reviews.filter(r => r.rating === 1).length
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
              <div className="stat-number">{reviews.length} +</div>
              <div className="stat-label">Happy Couples</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-content">
        <div className="reviews-container">
          {loading ? (
            <div className="reviews-loading">Loading reviews...</div>
          ) : error ? (
            <div className="reviews-error">{error}</div>
          ) : reviews.length === 0 ? (
            <div className="reviews-empty">
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card__header">
                    <div className="review-card__info">
                      <h3 className="review-card__name">{review.name}</h3>
                      <div className="review-card__meta">
                        <span className="review-card__location">{review.city}</span>
                        <span className="review-card__date">{formatDate(review.created_at)}</span>
                      </div>
                      {review.video_title && (
                        <div className="review-card__video">
                     
                          <button 
                            className="review-card__video-link"
                            onClick={() => navigate(`/order/${review.video_id}`)}
                          >
                            {review.video_title}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="review-card__rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <div className="review-card__content">
                    <p className="review-card__text">{review.comment}</p>
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
          )}
        </div>
      </div>

    </div>
  );
};
