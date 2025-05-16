import React, { useState, useEffect } from 'react';

const VideoEmbed = ({ videoId, title }) => {
  const [iframeError, setIframeError] = useState(false);
  
  // Check if the iframe loads properly
  useEffect(() => {
    // Allow some time for the iframe to load or fail
    const timer = setTimeout(() => {
      const iframe = document.getElementById(`youtube-iframe-${videoId}`);
      if (iframe) {
        try {
          // If we can't access content window, there might be an error
          if (iframe.clientHeight === 0 || iframe.contentWindow === null) {
            setIframeError(true);
          }
        } catch (e) {
          // Cross-origin errors indicate the iframe didn't load properly
          setIframeError(true);
        }
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [videoId]);
  
  return (
    <div className="relative">
      {/* YouTube Embed */}
      <iframe 
        id={`youtube-iframe-${videoId}`}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      
      {/* Fallback for environments where YouTube is blocked */}
      {iframeError && (
        <div className="absolute inset-0 bg-dark-800 bg-opacity-90 flex flex-col items-center justify-center rounded-lg">
          <div className="text-3xl text-red-500 mb-3"><i className="fas fa-video-slash"></i></div>
          <h4 className="text-lg font-bold mb-1">Video Content Unavailable</h4>
          <p className="text-sm text-center text-gray-300 mb-4 px-4">
            This YouTube content may be blocked in your current environment
          </p>
          <a 
            href={`https://youtu.be/${videoId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition"
          >
            <i className="fab fa-youtube mr-1"></i> Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;
