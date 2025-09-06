import React, { useState, useEffect } from 'react';
import { submitReview, supabase } from '../../lib/supabase';
import './ReviewForm.css';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  city: string;
  created_at: string;
}

interface ReviewFormProps {
  videoId?: string;
  videoTitle: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ videoId, videoTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [videoReviews, setVideoReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      fetchVideoReviews();
    }
  }, [videoId]);

  const fetchVideoReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideoReviews(data || []);
    } catch (error) {
      console.error('Error fetching video reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || formData.rating === 0 || !formData.comment.trim() || !formData.city.trim()) {
      setSubmitStatus('error');
      setMessage('Please fill in all fields and select a rating.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const reviewData = {
        ...formData,
        videoId,
        videoTitle
      };

      const result = await submitReview(reviewData);
      
      if (result.success) {
        setSubmitStatus('success');
        setMessage('Thank you for your review! It has been submitted successfully.');
        setFormData({ name: '', rating: 0, comment: '', city: '' });
        fetchVideoReviews(); // Refresh reviews
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      setSubmitStatus('error');
      setMessage('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`star-btn ${index < rating ? 'star-btn--filled' : 'star-btn--empty'} ${!interactive ? 'star-btn--readonly' : ''}`}
        onClick={interactive ? () => handleRatingClick(index + 1) : undefined}
        disabled={!interactive}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const averageRating = videoReviews.length > 0 
    ? (videoReviews.reduce((sum, review) => sum + review.rating, 0) / videoReviews.length).toFixed(1)
    : 0;

  return (
    <div className="review-section">
      <div className="review-section__container">
        <div className="review-section__header">
          <h3 className="review-section__title">Reviews & Feedback</h3>
          <p className="review-section__subtitle">Share your experience and see what others think about this invite</p>
        </div>

        <div className="review-section__content">
          {/* Left Side - Review Form */}
          <div className="review-form-wrapper">
            <div className="review-form-card">
              <h4 className="review-form-card__title">Write a Review</h4>
              
              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your City</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div className="rating-container">
                    <div className="rating-stars">
                      {renderStars(formData.rating, true)}
                    </div>
                    <span className="rating-text">
                      {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Share your thoughts about this video invite..."
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>

                {message && (
                  <div className={`form-message ${submitStatus === 'success' ? 'form-message--success' : 'form-message--error'}`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Existing Reviews */}
          <div className="reviews-display-wrapper">
            <div className="reviews-display-card">
              <div className="reviews-display-header">
                <h4 className="reviews-display-title">Customer Reviews</h4>
                {videoReviews.length > 0 && (
                  <div className="reviews-summary">
                    <div className="reviews-summary__rating">
                      <span className="average-rating">{averageRating}</span>
                      <div className="average-stars">
                        {renderStars(Math.round(parseFloat(averageRating|| '0')), false)}
                      </div>
                    </div>
                    <span className="reviews-count">({videoReviews.length} review{videoReviews.length !== 1 ? 's' : ''})</span>
                  </div>
                )}
              </div>

              <div className="reviews-list">
                {reviewsLoading ? (
                  <div className="reviews-loading">Loading reviews...</div>
                ) : videoReviews.length === 0 ? (
                  <div className="reviews-empty">
                    <div className="reviews-empty__icon">💬</div>
                    <h5>No reviews yet</h5>
                    <p>Be the first to share your experience with this invite!</p>
                  </div>
                ) : (
                  videoReviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-item__header">
                        <div className="review-item__info">
                          <h6 className="review-item__name">{review.name}</h6>
                          <span className="review-item__location">{review.city}</span>
                        </div>
                        <div className="review-item__meta">
                          <div className="review-item__rating">
                            {renderStars(review.rating, false)}
                          </div>
                          <span className="review-item__date">{formatDate(review.created_at)}</span>
                        </div>
                      </div>
                      <p className="review-item__comment">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
