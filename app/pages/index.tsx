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
      strings: ['Software Engineer', 'Web Developer', 'App Developer', 'Freelancer'],
      typeSpeed: 1,    // Typing speed in milliseconds (lower = faster)
      backSpeed: 50,     // Backspacing speed in milliseconds (lower = faster)
      startDelay: 300,   // Delay before typing starts
      cursorChar: '<',
      backDelay: 1500,   // Delay before backspacing
      loop: true,        // Repeat typing loop
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
          {"<span> "}<span className="text-green-500" ref={el}/> <span>&nbsp; </span>
            
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" </span>"}
          
          </h2>
          <br />
          <h1 className="text-4xl font-bold dm-mono-regular">Ezekhiel Paras {"{"} Full <br />Stack{" }"} Web & App <br />developer_</h1>
          <br />
          <p>With expertise in cutting-edge technologies such as NodeJS, React, Angular, and Laravel... I deliver web solutions that are both innovative and robust.</p>
                  </div>
      </div>
      <main className="flex flex-col items-center gap-8 p-5">
        <TechInfoSection/>
        
        <section id="experiences" className="w-full p-10">
          <h2 className="text-2xl text-center font-semibold text-green-500">Experiences</h2>
          <div className="mt-4 p-12">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-green-500">Freelance Software Engineer</h3>
              <h4 className="text-lg text-gray-600">Self-Employed</h4>
              <p className="mt-2 text-left">
              As a freelance software engineer, I worked with both local and international clients, delivering custom software solutions across various industries. Key projects include:
              </p>
              <ul className="list-disc list-inside mt-2 text-left">
                <li>
                  <strong>Enrollment System for School:</strong> I Developed a custom enrollment system for my school, which was adopted and integrated into their operations, along with staff training. This project strengthened my skills in API integration, database management, and full-stack development.
                </li>
                <li>
                  <strong>Parking Lot Tracking System:</strong> Built a real-time parking lot tracker using machine learning for space detection, WebSockets for live updates, and secure authentication methods for mobile access.
                </li>
                <li>
                  <strong>E-commerce Website for a Chocolate School and Store:</strong> Created an e-commerce website for a local chocolate school and store in Makati, integrating payment systems and optimizing the user experience.
                </li>
              </ul>
              <p className="mt-2 text-left">
                Additionally, my experience extends to Cisco networking, where I designed and implemented network solutions for local devices, enhancing my understanding of networking alongside software development.
              </p>
              <p className="mt-2 text-left">
                Throughout my freelance career, I have developed a broad technical skill set that spans API integration, machine learning, web and mobile development, e-commerce platforms, and network management. I pride myself on delivering high-quality, scalable solutions while maintaining a strong focus on user experience and security.
              </p>
            </div>
          </div>
          <hr />
          <div className="mt-4 p-12">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-green-500">SEO Specialist | Microsoft Ads</h3>
              <h4 className="text-lg text-gray-600">Microsoft/Majorel</h4>
              <p className="mt-2 text-left">
              As an SEO Specialist at Microsoft Ads, I worked closely with developers and business owners to help them integrate Microsoft Ads APIs, track app revenue, and grow their online presence through effective ad strategies. My responsibilities spanned various aspects of digital marketing, from technical integrations to personalized growth strategies for businesses. Key contributions include:
              </p>
              <ul className="list-disc list-inside mt-2 text-left">
                <li>
                  <strong>API Integration & Revenue Tracking:</strong> Assisted developers in integrating Microsoft Ads APIs into their apps, enabling businesses to track and optimize their ad revenue. This role honed my skills in technical troubleshooting and delivering tailored solutions based on individual business needs.
                </li>
                <li>
                  <strong>Bing Ads Optimization:</strong> Introduced clients to the untapped potential of Bing Ads, optimizing their paid ad campaigns to boost visibility and drive revenue. This involved analyzing campaigns, making data-driven adjustments, and continuously refining strategies.
                </li>
                <li>
                  <strong>SEO & Targeted Ads Strategy:</strong> Collaborated with business owners to improve both on-site and off-site SEO, refining ad targeting strategies to better reach their desired audiences. I led meetings to understand each business's unique goals and effectively align ads with their target markets.
                </li>
              </ul>
              <p className="mt-2 text-left">
                Additionally, my experience extends to Cisco networking, where I designed and implemented network solutions for local devices, enhancing my understanding of networking alongside software development.
              </p>
              <p className="mt-2 text-left">
              Through my experience, I developed a deep understanding of search engine marketing, audience targeting, and digital growth strategies, helping clients increase their visibility and scale their businesses.
              </p>
            </div>
          </div>
        </section>



        <ProjectsSection projects={projects} />
        
      </main>
      <footer className="flex justify-center py-8">
      </footer>
    </div>
  );
};

export default Home;