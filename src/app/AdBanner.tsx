'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `
        atOptions = {
          'key' : '0014a5840d21e847c2111cd988ca5f89',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://pl28414451.effectivecpmrate.com/0014a5840d21e847c2111cd988ca5f89/invoke.js';

      bannerRef.current.appendChild(conf);
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full py-4 flex justify-center bg-gray-950 border-b border-gray-900">
      <div ref={bannerRef} className="min-h-[90px] min-w-[728px] flex items-center justify-center overflow-hidden"></div>
    </div>
  );
}