import React from 'react';
import { Project } from '../ProjectsList/ProjectsList';
import styles from './ProjectCard.module.css'

interface ProjectProps {
  project: Project
  handleRemoveProject: (id:string) => void
}

const ProjectCard = (props: ProjectProps) => {
  const project:Project = props.project
  return (
    <a className={styles.cardGrid} href={project.url}>
      <div
        className={styles.cardContainer}
        style={{backgroundColor: project.color}}
      >
        <div>
        <button
          onClick={() => props.handleRemoveProject(project.id)}
          className={styles.btn}
        >
          ✘
        </button>
          <h2>{project.name}</h2>
          <div>{Array(project.rating).fill("⭐️")}</div>
        </div>
      </div>
    </a>     
  );
};

export default ProjectCard;