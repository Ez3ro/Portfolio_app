

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
import emailIcon from '../../public/images/gmail.png';
import linkedinIcon from '../../public/images/linkedin.png';
import githubIcon from '../../public/images/github.png';
import facebookLogo from '../../public/images/facebook.png';

const TechInfoSection: React.FC = () => {
  return (
    <section id="tech-stacks-contacts" className="w-full "> 
    <marquee>
      <div className="flex flex-col items-center space-y-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl">
          <div className="flex flex-col items-center space-y-10">
            <h2 className="text-2xl font-semibold">Tech Stack</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <img src={pythonLogo.src} alt="Python" className="w-12 h-12" />
                <span>Python</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={djangoLogo.src} alt="Django" className="w-12 h-12" />
                <span>Django</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={phpLogo.src} alt="PHP" className="w-12 h-12" />
                <span>PHP</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={laravelLogo.src} alt="Laravel" className="w-12 h-12" />
                <span>Laravel</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={javascriptLogo.src} alt="JavaScript" className="w-12 h-12" />
                <span>Java Script</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={nextjsLogo.src} alt="Next.js" className="w-12 h-12" />
                <span>Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={reactLogo.src} alt="React.js" className="w-12 h-12" />
                <span>React.js</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={tailwindLogo.src} alt="TailwindCSS" className="w-12 h-12" />
                <span>TailwindCSS</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-10">
            <h2 className="text-2xl font-semibold">Contacts & Socials</h2>
            <div className="mt-4 flex flex-col items-left gap-2">
                
              <div className="flex items-center gap-2">
                <span className="text-3xl ml-2">#</span>
                <a href="" className="text-green-500 ml-2">+639673881201</a>
              </div>
              <div className="flex items-left gap-2">
                <img src={emailIcon.src} alt="Email" className="w-6 h-6" />
                <a href="mailto:ezekhielofficial@gmail.com" className="text-green-500 ml-2">ezekhielofficial@gmail.com</a>
              </div>
              <div className="flex items-left gap-2">
                <img src={linkedinIcon.src} alt="LinkedIn" className="w-6 h-6" />
                <a href="https://www.linkedin.com/in/ezekhiel-paras-27929833b/" className="text-green-500 ml-2">linkedin</a>
              </div>
              <div className="flex items-left gap-2">
                <img src={githubIcon.src} alt="GitHub" className="w-6 h-6" />
                <a href="https://github.com/Ez3ro" className="text-green-500 ml-2">github</a>
              </div>
              <div className="flex items-left gap-2">
                <img src={facebookLogo.src} alt="Facebook" className="w-6 h-6" />
                <a href="https://facebook.com/yourusername" className="text-green-500 ml-2">facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </marquee>
    </section>
  );
};

export default TechInfoSection;