"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  imageFile?: File;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = async () => {
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProjects((prevProjects) => [...prevProjects, response.data]);
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteAllProjects = async () => {
    try {
      await axios.delete('/api/projects');
      setProjects([]);
    } catch (error) {
      console.error('Error deleting projects:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-64 h-32 object-cover rounded"
            />
          </div>
        )}
        <button
          onClick={addProject}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
        {/* <button
          onClick={deleteAllProjects}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
        >
          Delete All Projects
        </button> */}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover mt-2 rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;