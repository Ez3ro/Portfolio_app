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
import { FiFacebook } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
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
            
            <p className="text-2xl pb-2 flex flex-row text-gray-400"><FiFacebook /><a className="text-base pl-3 text-cyan-500" href="https://www.facebook.com/eze.khiel3"> Facebook.com</a></p>
            <p className="text-2xl pb-2 flex flex-row text-gray-400"><FiGithub/> <a className="text-base pl-3 text-cyan-500" href="https://github.com/Ez3ro"> Github.com</a> </p>
            <p className="text-2xl pb-2 flex flex-row text-gray-400"><FiLinkedin/> <a className="text-base pl-3 text-cyan-500" href="https://www.linkedin.com/in/ezekhiel-paras-27929833b/"> LinkedIn.com</a></p>
            <p className="text-2xl pb-2 flex flex-row text-gray-400"><FiMail/> <a className="text-base pl-3 text-cyan-500 " href="mailto:Ezekhielofficial@gmail.com"> Ezekhielofficial@gmail.com</a></p>

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
       



        <ProjectsSection projects={projects} />
        
    
      <footer className="flex justify-center py-8">
      </footer>
    </div>
  );
};

export default Home;