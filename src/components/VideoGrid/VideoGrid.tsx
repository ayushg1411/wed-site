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
              
              <div onClick={() => handleBookNow(video.id)} className="video-grid__info">
                <h3 className="video-grid__video-title">{video.title}</h3>
                {video.description && (
                  <p className="video-grid__description">{video.description}</p>
                )}
                  <div className='detail-cnt'>
                  <p className="video-grid__detail" >Pages<span className='detail-style' style={{color:"green",fontWeight:500}} > {video.pages}</span></p>
                  <p className="video-grid__detail">Price <span className='detail-style' style={{color:"green", fontWeight:500}}>Rs.{video.price}</span></p>
                  </div>

                {video.duration && (
                  <span className="video-grid__duration" >Order</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
