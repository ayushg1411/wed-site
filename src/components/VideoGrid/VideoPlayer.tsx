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
  const [isMuted, setIsMuted] = useState(false);
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
      setIsPlaying(false);
    } else {
      // Pause other videos
      videoInstances.forEach((instance, id) => {
        if (id !== vimeoId) {
          instance.pause();
          instance.setPlaying(false);
        }
      });
      setIsPlaying(true);
      sendCommand('play');
  };
}

  
  
  const handleMuteToggle = () => {
    if (isMuted) {
      sendCommand('setVolume', 1);
      setIsMuted(false);
    } else {
      sendCommand('setVolume', 0);
      setIsMuted(true);
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
          src={`https://player.vimeo.com/video/${vimeoId}?api=1&background=0&controls=0&title=0&byline=0&portrait=0&autopause=0&autoplay=0`}
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
            className="video-player__control-btn video-player__mute-btn"
            onClick={handleMuteToggle}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
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

