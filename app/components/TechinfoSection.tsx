

import React from 'react';

// Import images
import pythonLogo from '../../public/images/python.png';
import phpLogo from '../../public/images/php.png';
import laravelLogo from '../../public/images/laravel.png';
import nextjsLogo from '../../public/images/nextjs.png';
import reactLogo from '../../public/images/react.png';
import tailwindLogo from '../../public/images/tailwind.png';
import djangoLogo from '../../public/images/django.png';
import javascriptLogo from '../../public/images/javascript.png';

const TechInfoSection: React.FC = () => {
  return (
    <div className="flex flex-col items-left space-y-10 py-10">
    <div className="flex flex-wrap justify-left gap-16 w-full overflow-hidden">
      <div className="flex flex-row items-left gap-12">

        <div className="flex items-left w-56 min-w-0 gap-5 flex-shrink-0 overflow-hidden">
        <div className="marquee flex items-center gap-5">   
        <img src={pythonLogo.src} alt="Python" className="w-12 h-12" />
          <img src={djangoLogo.src} alt="Django" className="w-12 h-12" />
          <img src={phpLogo.src} alt="PHP" className="w-12 h-12" />
          <img src={laravelLogo.src} alt="Laravel" className="w-12 h-12" />
          <img src={javascriptLogo.src} alt="JavaScript" className="w-12 h-12" />
          <img src={nextjsLogo.src} alt="Next.js" className="w-12 h-12" />
          <img src={reactLogo.src} alt="React.js" className="w-12 h-12" />
          <img src={tailwindLogo.src} alt="TailwindCSS" className="w-12 h-12" />
          {/* Repeat the icons to create a continuous effect */}
          <img src={pythonLogo.src} alt="Python" className="w-12 h-12" />
          <img src={djangoLogo.src} alt="Django" className="w-12 h-12" />
          <img src={phpLogo.src} alt="PHP" className="w-12 h-12" />
          <img src={laravelLogo.src} alt="Laravel" className="w-12 h-12" />
          <img src={javascriptLogo.src} alt="JavaScript" className="w-12 h-12" />
          <img src={nextjsLogo.src} alt="Next.js" className="w-12 h-12" />
          <img src={reactLogo.src} alt="React.js" className="w-12 h-12" />
          <img src={tailwindLogo.src} alt="TailwindCSS" className="w-12 h-12" />
        </div>
        </div>
        <div className="flex items-center">
          <span className="text-lg text-gray-500">... and more</span>
        </div>
      </div>
      
    </div>
  </div>
      
  );
};

export default TechInfoSection;