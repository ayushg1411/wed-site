import React, { useState, useRef, useEffect } from 'react';
import { VideoPlayerProps } from './types';
import './VideoPlayer.css';

// Global state to track currently playing video
let currentlyPlayingVideo: string | null = null;
const videoInstances = new Map<string, { pause: () => void; setPlaying: (playing: boolean) => void }>();

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  vimeoId,
  title,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Register this video instance
    const pauseThisVideo = () => {
      sendCommand('pause');
    };

    const setPlayingState = (playing: boolean) => {
      setIsPlaying(playing);
    };

    videoInstances.set(vimeoId, { 
      pause: pauseThisVideo, 
      setPlaying: setPlayingState 
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.vimeo.com') return;
      
      try {
        const data = JSON.parse(event.data);
        
        switch (data.event) {
          case 'ready':
            setIsLoading(false);
            break;
          case 'play':
            setIsPlaying(true);
            currentlyPlayingVideo = vimeoId;
            break;
          case 'pause':
            setIsPlaying(false);
            if (currentlyPlayingVideo === vimeoId) {
              currentlyPlayingVideo = null;
            }
            break;
        }
      } catch (error) {
        console.error('Error parsing Vimeo message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      videoInstances.delete(vimeoId);
      if (currentlyPlayingVideo === vimeoId) {
        currentlyPlayingVideo = null;
      }
    };
  }, [vimeoId]);

  const sendCommand = (command: string, value?: any) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const data = {
      method: command,
      value: value
    };

    try {
      iframe.contentWindow.postMessage(JSON.stringify(data), 'https://player.vimeo.com');
    } catch (error) {
      console.error('Error sending command to Vimeo:', error);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      sendCommand('pause');
      setIsPlaying(false)
    } else {
      // Pause all other videos
      videoInstances.forEach((instance, id) => {
        if (id !== vimeoId) {
          instance.pause();
          instance.setPlaying(false);
        }
      });
      setIsPlaying(true)
      sendCommand('play');
      sendCommand('setVolume', 1); // Always set volume to 1 (unmuted)
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = () => {
    const videoPlayer = document.querySelector(`[data-video-id="${vimeoId}"]`);
    if (!videoPlayer) return;

    if (!isFullscreen) {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
      } else if ((videoPlayer as any).webkitRequestFullscreen) {
        (videoPlayer as any).webkitRequestFullscreen();
      } else if ((videoPlayer as any).msRequestFullscreen) {
        (videoPlayer as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  return (
    <div className={`video-player ${className || ''}`} data-video-id={vimeoId}>
      <div className="video-player__wrapper">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${vimeoId}?api=1&background=0&controls=0&title=0&byline=0&portrait=0&autoplay=0`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
          className="video-player__iframe"
        />
        
        {isLoading && (
          <div className="video-player__loading">
            <div className="video-player__spinner"></div>
          </div>
        )}
        
        <div className="video-player__controls">
          <button
            className="video-player__control-btn video-player__play-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button
            className="video-player__control-btn video-player__fullscreen-btn"
            onClick={handleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};