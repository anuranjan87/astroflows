"use client"
import { useState } from 'react';

export default function IframeComponent() {
  const [zoom, setZoom] = useState(1); // Default zoom level is 1 (100%)
  const iframeWidth = '100%'; // Adjust as needed
  const iframeHeight = '100%'; // Adjust as needed

  const handleZoomChange = (event) => {
    setZoom(Number(event.target.value));
  };

  return (
    <div>
      <iframe
        id="zoomableIframe"
        title="Rendered Content"
        srcDoc={`<html><body style="zoom: ${zoom};"><p>hello heaven</p></body></html>`}
        sandbox="allow-scripts allow-same-origin allow-top-navigation"
        style={{
          width: iframeWidth,
          height: iframeHeight,
          height: 'auto',
          border: 'none'
        }}
        className="outline-dotted rounded-xl bg-white"
        onLoad={(e) => {
          const iframe = e.target;
          // Adjust height based on scaled content
          const scale = zoom;
          iframe.style.height = `${iframe.contentWindow?.document.documentElement.scrollHeight * scale}px`;
        }}
      ></iframe>
      
      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button onClick={() => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.1))}>Zoom Out</button>
        <button onClick={() => setZoom(prevZoom => Math.min(prevZoom + 0.1, 3))}>Zoom In</button>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={handleZoomChange}
        />
        <span>{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}
