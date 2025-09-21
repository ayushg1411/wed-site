import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoGrid/VideoPlayer';
import { MultiStepForm } from '../components/MultiStepForm/MultiStepForm';
import { ReviewForm } from '../components/ReviewForm/ReviewForm';
import './OrderPage.css';
import { sampleVideos } from '../constatnts/VideosData';

interface Video {
  id: string;
  vimeoId: string;
  title: string;
  description?: string;
  duration?: string;
  price: number
  originalPrice: number
  categories: any[];
  code: string;
  tier: {
    label: string;
    bgColor: string;
    color: string;
  };
}



export const OrderPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const foundVideo = sampleVideos.find(v => v.code === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [videoId]);

  if (!video) {
    return <div className="order-page__loading">Video not found</div>;
  }

  return (
    <div className="order-page">
      <div className="order-page__container">
        {/* Video Section */}
        <div className="order-page__video-section">
          <div className="order-page__video-wrapper">
            <VideoPlayer
              vimeoId={video.vimeoId}
              title={video.title}
              className="order-page__video-player"
            />
          </div>
        </div>

        {/* Multi-Step Form Section */}
        <div className="order-page__form-section">
          <div className="order-page__form-wrapper">
            <div className="order-page__video-info">
             <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                  
                 <h2 className="order-page__video-title">{video.title}   <div className="video-meta__tier-badge" style={{ 
                    backgroundColor: video.tier.bgColor, 
                    color: video.tier.color 
                  }}>
                    <span className="tier-icon">👑</span>
                    {video.tier.label}
                  </div></h2>
                 {video.description && (
                <p className="order-page__video-description">{video.description}</p>
              )}
                <div className="video-meta__item">
                
               
                   <span className="video-grid__code">#{video.code}</span>
                  <span className="video-grid__duration-badge" title="Video Duration">
                    {video.duration}
                  </span>
                  <div className='video-meta__category_cnt'>
                       {
                        video.categories.map((category: any) => (
                       
                        <span className="video-meta__value">{category.replace(/-/g, ' ').replace(/\b\w/g, (l:any) => l.toUpperCase())}</span>
                      
                      ))
                      }
                  </div>
                 
                </div>
              
              {/* Video Meta Information */}
             
              </div>
             <div>   

              <h2
  className="order-page__video-title"
  style={{
    minWidth: '100px',
    padding: 0,
    margin: 0,
    // textDecoration: 'line-through',
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px' // spacing between icon and text
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
  </svg>
  {video.price}
</h2>
               <h6
  className="order-page__video-title"
  style={{
    minWidth: '100px',
    fontSize: '12px',
    padding: 0,
    margin: 0,
    textDecoration: 'line-through',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px' // spacing between icon and text
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
  </svg>
  {video.originalPrice}
</h6>
</div>
             </div>
             
            </div>
            <MultiStepForm videoId={videoId} video={video} videoTitle={video.title} />
          </div>
        </div>
      </div>
      
      {/* Need Help Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <a
          href="https://wa.me/7017835443" // <-- Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#25D366',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '24px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          Need Help ? 
        </a>
      </div>

      {/* Reviews Section */}
      <div className="order-page__reviews-section">
        <ReviewForm videoId={videoId} videoTitle={video.title} />
      </div>
    </div>
  );
};
