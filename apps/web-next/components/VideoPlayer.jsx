'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Optimized video player with:
 * - IntersectionObserver-based lazy loading
 * - Auto play/pause based on viewport visibility
 * - Multiple format support (WebM + MP4)
 * - Poster frame for initial paint
 * - Only one video playing at a time globally
 */

// Global registry to track currently playing video
let currentlyPlayingVideo = null;

export function VideoPlayer({ 
  src, 
  poster, 
  alt = 'Project video',
  className = '',
  threshold = 0.35 
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Track when video enters/leaves viewport
  const { ref: inViewRef, inView } = useInView({
    threshold,
    triggerOnce: false, // Re-trigger when scrolling back
  });

  // Combine refs
  const setRefs = (element) => {
    videoRef.current = element;
    inViewRef(element);
  };

  // Load video when it's near viewport (1 screen away)
  const { ref: loadRef } = useInView({
    rootMargin: '100% 0px', // 1 screen in advance
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setShouldLoad(true);
      }
    }
  });

  const combinedRef = (element) => {
    setRefs(element);
    loadRef(element);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (inView) {
      // Pause any other playing video first
      if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
        currentlyPlayingVideo.pause();
      }

      // Play this video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            currentlyPlayingVideo = video;
          })
          .catch((error) => {
            // Auto-play prevented or video not loaded yet
            console.log('Video play prevented:', error);
          });
      }
    } else {
      // Pause when out of view
      video.pause();
      if (currentlyPlayingVideo === video) {
        currentlyPlayingVideo = null;
      }
    }
  }, [inView, shouldLoad]);

  // Extract filename without extension for WebM alternative
  const getWebMSrc = (mp4Src) => {
    return mp4Src.replace(/\.mp4$/i, '.webm');
  };

  const hasWebM = src.endsWith('.mp4'); // We'll generate WebM versions

  return (
    <video
      ref={combinedRef}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className={className}
      aria-label={alt}
    >
      {shouldLoad && hasWebM && (
        <source src={getWebMSrc(src)} type="video/webm" />
      )}
      {shouldLoad && (
        <source src={src} type="video/mp4" />
      )}
      Your browser does not support the video tag.
    </video>
  );
}
