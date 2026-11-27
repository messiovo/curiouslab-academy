// src/components/SimulationFrame.jsx
// Embeds a self-contained simulation from /public/simulations/ and keeps it in sync with the site:
//  - follows the light/dark toggle (the `dark` class on <html>) without reloading
//  - grows to the height the simulation reports, so there is no double scrollbar
//  - scrolls the page back up to the top of the frame when the simulation asks (used by the Science Playground)
import React, { useEffect, useRef, useState } from 'react';

const getTheme = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

const SimulationFrame = ({ src, title, initialHeight = 900, className = '' }) => {
  const frameRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);
  const [startTheme] = useState(getTheme); // fixed on first render so toggling never reloads the frame

  const sendTheme = () => {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'curiouslab-theme', theme: getTheme() },
      window.location.origin
    );
  };

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (!data) return;
      if (data.type === 'curiouslab-height' && Number.isFinite(data.height)) {
        setHeight(data.height);
      }
      if (data.type === 'curiouslab-scroll-top') {
        const top = frameRef.current.getBoundingClientRect().top;
        if (top < 0) window.scrollTo({ top: Math.max(0, window.scrollY + top - 90), behavior: 'smooth' });
      }
    };
    window.addEventListener('message', onMessage);

    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('message', onMessage);
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      src={`${src}?theme=${startTheme}`}
      title={title}
      onLoad={sendTheme}
      style={{ height }}
      className={`block w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-card-bg ${className}`}
    />
  );
};

export default SimulationFrame;
