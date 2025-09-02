import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoScrollInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoScrollInterval = 4000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [images.length, autoScrollInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`image-carousel ${className}`}>
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="carousel-slide">
              <img
                src={image.src}
                alt={image.alt}
                className="carousel-image"
                // loading={index === 0 ? 'eager' : 'lazy'}
              />
              {(image.title || image.subtitle) && (
                <div className="carousel-overlay">
                  <div className="carousel-content">
                    {image.title && <h2 className="carousel-title">{image.title}</h2>}
                    {image.subtitle && <p className="carousel-subtitle">{image.subtitle}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {showArrows && images.length > 1 && (
          <>
            <button
              className="carousel-arrow carousel-arrow--prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button
              className="carousel-arrow carousel-arrow--next"
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </>
        )}

        {showDots && images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};