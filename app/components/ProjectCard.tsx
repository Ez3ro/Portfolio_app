import React from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
    );

};

export default ProjectCard;