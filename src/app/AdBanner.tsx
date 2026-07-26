'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30516037.effectivecpmnetwork.com/f4811c63390720e9c05b975e50520e84/invoke.js';
      
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full py-4 flex justify-center bg-gray-950 border-b border-gray-900">
      <div 
        ref={bannerRef} 
        id="container-f4811c63390720e9c05b975e50520e84"
        className="min-h-[90px] min-w-[728px] flex items-center justify-center overflow-hidden"
      ></div>
    </div>
  );
}