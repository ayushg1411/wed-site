import React, { useState } from 'react';
import { submitReview } from '../../lib/supabase';
import './ReviewForm.css';

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

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`star-btn ${index < formData.rating ? 'star-btn--filled' : 'star-btn--empty'}`}
        onClick={() => handleRatingClick(index + 1)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
    ));
  };

  return (
    <div className="review-form">
      <div className="review-form__container">
        <h3 className="review-form__title">Share Your Experience</h3>
        <p className="review-form__subtitle">Help others by sharing your thoughts about this video template</p>
        
        <form onSubmit={handleSubmit} className="review-form__form">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-input3"
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
              className="form-input3"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="rating-stars">
              {renderStars()}
              <span className="rating-text">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review</label>
            <textarea
              className="form-textarea"
              placeholder="Share your thoughts about this video template..."
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              disabled={isSubmitting}
            />
          </div>

          {message && (
            <div className={`message ${submitStatus === 'success' ? 'message--success' : 'message--error'}`}>
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
  );
};
