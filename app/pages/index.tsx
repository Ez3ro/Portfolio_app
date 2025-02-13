/* eslint-disable */
"use client";
import React, { useState, useEffect, useRef  } from "react";
import axios from 'axios';
import ProjectsSection from '../components/ProjectsSection';
import Header from '../components/Header';
import TechInfoSection from '../components/TechinfoSection';
import Head from 'next/head';
import Typed from 'typed.js';
import dev from '../../public/images/dev2.png';
import { FiLayers } from "react-icons/fi";
import { FiCodepen } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { FiSmartphone } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiMail } from "react-icons/fi";

import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineDatabase } from "react-icons/ai";
import { AiOutlineApi } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineCloudSync } from "react-icons/ai";
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}




const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);


  

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Software Engineer'],
      typeSpeed: 10,    // Typing speed in milliseconds (lower = faster)
      backSpeed: 50,     // Backspacing speed in milliseconds (lower = faster)
      startDelay: 300,   // Delay before typing starts
      cursorChar: '|',
      backDelay: 1500,   // Delay before backspacing
      loop: false,        // Repeat typing loop
    });
  
    return () => typed.destroy();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>('/api/projects');
      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  return (
    <div className="background">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

      {/* <Header /> */}
      <div className="hero-wrapper grid grid-cols-12 gap-4 p-10">
        
        <div className="hero-image col-span-5">
          <img src={dev.src} alt="asdsad" className="" />
        </div>
        <div className="hero-text col-span-7 p-10 text-center gap-11">
          
          <h2 className="text-1xl mt-2">
          <div className="typing-container">
          <span className="text-cyan-500">{"<span> "}</span><span ref={el}/> <span>&nbsp; </span>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{"</span>"}</span> 
          
          </h2>
          <br />
          <h1 className="text-5xl font-bold dm-mono-regular">Ezekhiel Paras <span className="gradient-text">{"{"}Full <br />Stack{"}"}</span> Web & App <br />developer_</h1>
          <br />
          <p> <span className="text-cyan-500">{"<p>"}</span>With expertise in cutting-edge technologies such as  
          <span className="text-cyan-500"> NodeJS, React, Angular, and Laravel</span>... I deliver web solutions that are both innovative and robust. 
          <span className="text-cyan-500">{"</p>"}</span> </p>
          <br />
          <TechInfoSection/>
          <div className="flex flex-row text-center items-center">
            <br />
            <br />
            <br />
          <img className="h-6 w-6 top-2" src="/images/down.png" alt="" />
          <a className="text-center text-gray-500" target="_blank" href="assets/resume.pdf"><i className="text-neutral-400 font-bold text-lg"> [ Download my CV ]</i></a>
          </div>
          
          </div>
      </div>

  <div className="stats-info grid grid-cols-1 md:grid-cols-4 p-10 mt-8 items-left">
  <div className="info-items">
    <div className="stat-item text-2xl text-lime-400 "><FiLayers /></div>
    <div className="stat-item text-6xl">8+</div>
    <div className="stat-item pt-2">Experience</div>
  </div>
  <div className="info-items">
    <div className="stat-item text-2xl text-lime-400 "><FiCodepen  /></div>
    <div className="stat-item text-6xl">20+</div>
    <div className="stat-item pt-2">Projects</div>
  </div>
  <div className="info-items">
    <div className="stat-item text-2xl text-lime-400"><FiUserCheck /></div>
    <div className="stat-item text-6xl">8+</div>
    <div className="stat-item pt-2">Clients</div>
  </div>
  
</div>
     
        
        
        
        <div className="exp-container mx-auto">
        
        <div className="experiences-wrapper ">
        <h2 className="text-xl z-20 gradient-text">Experiences in 8+ years</h2>
        <br />

        <div className="z-20">
          <p>Free lance Software Engineer - <span className="text-gray-500">Self Employed</span><br />
               </p>
          <br />
          <p>SEO Specialist/API Support  - <span className="text-gray-500">Microsoft Ads</span> 
          <br />
    
          </p>
          <br />
          <p>Senior Software Engineer - <span className="text-gray-500">M6 makati</span>
          <br />
      
          </p>
          <br />
          <p>SoftWare Engineer - <span className="text-gray-500">WebIt AUS</span>
          <br />

          </p>
          <br />
          <div className="contact-wrapper">
            <h2 className="text-xl z-20  pb-5 gradient-text">Contacts
            </h2>
            
            <p className="text-2xl pb-2 flex flex-row text-gray-400">
  <FiSmartphone />
  <a className="text-base pl-3 text-cyan-500" href="sms:+639673881201">
    +63 967 3881 201
  </a>
</p>
<p className="text-2xl pb-2 flex flex-row text-gray-400">
  <FiGithub />
  <a className="text-base pl-3 text-cyan-500" href="https://github.com/Ez3ro" target="_blank" rel="noopener noreferrer">
    Github.com
  </a>
</p>
<p className="text-2xl pb-2 flex flex-row text-gray-400">
  <FiLinkedin />
  <a className="text-base pl-3 text-cyan-500" href="https://www.linkedin.com/in/ezekhiel-paras-27929833b/" target="_blank" rel="noopener noreferrer">
    LinkedIn.com
  </a>
</p>
<p className="text-2xl pb-2 flex flex-row text-gray-400">
  <FiMail />
  <a className="text-base pl-3 text-cyan-500" href="mailto:Ezekhielofficial@gmail.com">
    Ezekhielofficial@gmail.com
  </a>
</p>
          </div>
          
        </div>
        </div>
        <div className="git-wrapper flex flex-col">
         <h2 className="text-xl z-20 gradient-text">Github Repositories</h2>
         <br />
        <ul>
                <li> <span className="text-xs text-gray-400"> E-Obra </span></li>
                <br />
                <h2></h2>
                <li><span className="text-xs text-gray-400"> Portfolio_app</span></li>
                <br />
                <li><span className="text-xs text-gray-400"> student-housing-australia</span></li>
                <br />
                <li><span className="text-xs text-gray-400"> example-app                </span></li>
                <br />
                <li><span className="text-xs text-gray-400"> NacomexLive </span></li>
                <br />
                <li><span className="text-xs text-gray-400"> ServerLivestream </span></li>
                <br />
                <li><span className="text-xs text-gray-400"> ProjectParking
                </span></li>
                <br />
                <li><span className="text-xs text-gray-400"> ProjectVehicularDataBank-1
                </span></li>
              </ul>
        
        </div>
        </div>
       



        <div className="skills-wrapper grid grid-cols-12 gap-4 p-10 mt-8">
        <div className="skills-text z-10 text-4xl"> 
        Designing solutions <span className="text-gray-500 ">customized
          to meet your requirements</span>
        </div>

        
        <div className="skills-cards grid grid-cols-1 md:grid-cols-3 gap-6 col-span-12 z-50">
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300">
      <span className="text-2xl skill-icon font-bold "><AiOutlineAppstore/></span>
      <h3 className="text-xl font-bold mb-2">Web and App Development</h3>
      <p className="text-gray-500">Crafting visually appealing and user-friendly interfaces using <span className="text-cyan-500">HTML</span>, <span className="text-cyan-500">CSS</span>, <span className="text-cyan-500">JavaScript</span>, and modern frameworks like <span className="text-cyan-500">React</span> and <span className="text-cyan-500">Angular</span>.</p>
    </div>
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300 ">
    <span className="text-2xl skill-icon font-bold "><AiOutlineDatabase/></span>
      <h3 className="text-xl font-bold mb-2">Database Management</h3>
      <p className="text-gray-500">Designing and managing databases with SQL and NoSQL technologies such as  
      <span className="text-cyan-500"> MySQL</span>, 
      <span className="text-cyan-500"> PostgreSQL</span>, and 
      <span className="text-cyan-500"> MongoDB</span>.</p>
    </div>
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300">
    <span className="text-2xl skill-icon font-bold "><AiOutlineApi/></span>
      <h3 className="text-xl font-bold mb-2">API Development</h3>
      <p className="text-gray-500">Creating and integrating <span className="text-cyan-500">RESTful APIs</span> to enable smooth communication between <span className="text-cyan-500">front-end</span> and <span className="text-cyan-500">back-end</span> systems.</p>
    </div>
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300">
    <span className="text-2xl skill-icon font-bold hover:border-lime-400 transition-transform transform hover:scale-105 duration-300 "><AiOutlineRise/></span>
      <h3 className="text-xl font-bold mb-2">Performance Optimization</h3>
      <p className="text-gray-500">Improving the speed and performance of web applications to provide a better user experience. Work with <span className="text-cyan-500">Django</span>, <span className="text-cyan-500">Python</span>.</p>
    </div>
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300">
    
    <span className="text-2xl skill-icon font-bold "><AiOutlineShop/></span>
      <h3 className="text-xl font-bold mb-2">E-commerce Solutions</h3>
      <p className="text-gray-500">Developing scalable and secure payment solutions for <span className="text-cyan-500">e-commerce platforms</span> tailored to your business needs.</p>
    </div>
    <div className="skill-card p-6 bg-gray-800 rounded-lg h-60 hover:border-lime-400 transition-transform transform hover:scale-105 duration-300">
    <span className="text-2xl skill-icon font-bold "><AiOutlineCloudSync/></span>
      <h3 className="text-xl font-bold mb-2">Integrating APIs</h3>
      <p className="text-gray-500">Seamlessly integrating <span className="text-cyan-500">third-party APIs</span> into existing applications.</p>
    </div>
  </div>
  <div className="skills-text z-10 "> 
  Excited to take on new projects and collaborate.
  Let's chat about your ideas. <span className="text-lime-400">Reach out!</span>
        </div>
       
      </div>
        
    
      <footer className="flex justify-center py-8">
      </footer>
    </div>
  );
};

export default Home;