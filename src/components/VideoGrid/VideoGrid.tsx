import React from 'react';
import { VideoGridProps } from './types';
import { VideoPlayer } from './VideoPlayer';
import './VideoGrid.css';

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  title = "Featured Videos",
  className,
}) => {

   const handleBookNow = (videoId: string) => {
    window.location.href = `/order/${videoId}`;
  };
  return (
    <section className={`video-grid ${className || ''}`}>
      <div className="video-grid__container">
        {title && (
          <div className="video-grid__header">
            <h2 className="video-grid__title">{title}</h2>
          </div>
        )}
        
        <div className="video-grid__content">
          {videos.map((video, index) => (
            <div key={video.id} className={`video-grid__item video-grid__item--${index + 1}`}>
              <div className="video-grid__wrapper">
                <VideoPlayer
                  vimeoId={video.vimeoId}
                  title={video.title}
                  className="video-grid__player"
                />
              </div>
              
              <div onClick={() => handleBookNow(video.code)} className="video-grid__info">
                {/* Tier Badge */}
                <div className="video-grid__tier-badge" style={{ 
                  backgroundColor: video.tier.bgColor, 
                  color: video.tier.color 
                }}>
                  <span className="tier-icon">👑</span>
                  {video.tier.label}
                </div>

                <h3 className="video-grid__video-title">{video.title}</h3>
                
                {video.description && (
                  <p className="video-grid__description">{video.description}</p>
                )}

                {/* Code and Duration Row */}
                <div className="video-grid__meta-row">
                  <span className="video-grid__code">#{video.code}</span>
                  <span className="video-grid__duration-badge" title="Video Duration">
                    {video.duration}
                  </span>
                </div>

                {/* Pages and Pricing Row */}
                <div className="video-grid__detail-row">
                  <div className="video-grid__pages">
                    <span className="detail-label">Pages</span>
                    <span className="detail-value">{video.pages}</span>
                  </div>
                  
                  <div className="video-grid__pricing">
                    <span className="original-price">₹{video.originalPrice}</span>
                    <span className="current-price">₹{video.price}</span>
                    <span className="discount-badge">
                      {Math.round(((Number(video.originalPrice) - Number(video.price)) / Number(video.originalPrice)) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <div className="video-grid__action-buttons">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                      console.log('Added to cart:', video.id);
                    }}
                    className="video-grid__cart-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(video.id);
                    }}
                    className="video-grid__order-btn"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
