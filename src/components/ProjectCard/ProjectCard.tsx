import React from 'react';
import { Project } from '../ProjectsList/ProjectsList';
import styles from './ProjectCard.module.css'

interface ProjectProps {
  project: Project
  handleRemoveProject: (id:string) => void
}

const ProjectCard: React.FC<ProjectProps> = ({ project, handleRemoveProject }) => {
  return (
    <div className={styles.cardGrid}>
      <div
        className={styles.cardContainer}
        style={{backgroundColor: project.color}}
      >
        <div>
        <button
          onClick={() => handleRemoveProject(project.id)}
          className={styles.btn}
        >
          ✘
        </button>
        <a className={styles.name} href={project.url}>
          <h2>
            {project.name}
          </h2>
        </a >
          <div>{Array(project.rating).fill("⭐️")}</div>
        </div>
      </div>
    </div>     
  );
};

export default ProjectCard;