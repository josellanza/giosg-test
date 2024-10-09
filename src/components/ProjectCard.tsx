import React from 'react';

interface ProjectProps {
  project: Project
}

interface Project {
  id: string
  name: string
  url: string
  rating: number
  created_at: string
} 

const ProjectCard = (props: ProjectProps) => {

  const project = props.project
  return (
    <div className="project-card">
      <div className="card-header">
        <h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
        <button className="remove-btn">X</button>
      </div>
      <p>Rating: {project.rating}</p>
      <p>Created At: {new Date(project.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default ProjectCard;