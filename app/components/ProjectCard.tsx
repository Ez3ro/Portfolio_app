import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image }) => {
  return (
    <div className="rounded overflow-hidden transform transition duration-500 hover:scale-105  p-5 border border-transparent hover:border-green-500">
      <img className="w-full h-60" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;