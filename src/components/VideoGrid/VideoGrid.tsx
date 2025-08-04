import React from 'react';
import { VideoGridProps } from './types';
import { VideoPlayer } from './VideoPlayer';
import './VideoGrid.css';

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  title = "Featured Videos",
  className
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
              
              <div className="video-grid__info">
                <h3 className="video-grid__video-title">{video.title}</h3>
                {video.description && (
                  <p className="video-grid__description">{video.description}</p>
                )}
                {video.duration && (
                  <span className="video-grid__duration"  onClick={() => handleBookNow(video.id)}>Book</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
