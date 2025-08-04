import React from 'react';
import { VideoGridProps } from './types';
import './VideoGrid.css';

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  title = "Featured Videos",
  className
}) => {
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
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                  className="video-grid__iframe"
                ></iframe>
              </div>
              
              <div className="video-grid__info">
                <h3 className="video-grid__video-title">{video.title}</h3>
                {video.description && (
                  <p className="video-grid__description">{video.description}</p>
                )}
                {video.duration && (
                  <span className="video-grid__duration">{video.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};