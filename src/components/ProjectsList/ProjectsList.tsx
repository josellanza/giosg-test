import { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectForm from '../ProjectForm/ProjectForm';
import styles from './ProjectsList.module.css'
import { Button } from 'antd';

export interface Project {
  id: string
  name: string
  url: string
  rating: number
  created_at: string
  color?: string
} 

const ProjectsList = () => {
  const githubProjects = [
    {
      id: "a87e8618-7392-4ac2-b4d0-c6b9b8fb3304",
      name: "React",
      url: "https://github.com/facebook/react",
      rating: 5,
      created_at: "2023-11-19T13:46:36.211Z"
    },
    {
      id: "a2f4e2e7-33ef-461c-a846-da88d6d4b536",
      name: "NodeJs",
      url: "https://github.com/nodejs/node",
      rating: 3,
      created_at: "2023-11-19T13:47:12.795Z"
    },
    {
      id: "836e6ac0-4c58-4392-8795-650108e67b3c",
      name: "AngularJs",
      url: "https://github.com/angular/angular.js?",
      rating: 2,
      created_at: "2022-11-19T13:47:18.933Z"
    },
    {
      id: "b62fe100-71b6-4ce0-a8b0-3f365d99621f",
      name: "Django",
      url: "https://github.com/django/django",
      rating: 5,
      created_at: "2023-11-20T13:47:08.026Z"
    },
    {
      id: "1342d001-2871-4e17-9f47-979815b825d0",
      name: "Jest",
      url: "https://github.com/facebook/jest",
      rating: 3,
      created_at: "2021-11-21T13:12:55.403Z"
    },
    {
      id: "22c9861a-5c65-4275-bb15-165938896ae9",
      name: "Docker",
      url: "https://github.com/docker",
      rating: 4,
      created_at: "2023-03-19T13:47:01.492Z"
    },
    {
      id: "01516ba7-0556-4c78-ba72-2a93865e5bfb",
      name: "Selenium",
      url: "https://github.com/SeleniumHQ/selenium",
      rating: 1,
      created_at: "2023-12-01T11:46:49.460Z"
    },
    {
      id: "c3da7eab-ef0e-4868-9875-bebef24fd706",
      name: "Playwright",
      url: "https://github.com/microsoft/playwright",
      rating: 1,
      created_at: "2024-01-10T10:11:49.460Z"
    }
  ];

  const colors = ["#cbdbf5", "#ccf0cf", "#f7dfd2", "#d4d4d6", "#f6c6f7"];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : githubProjects.map(project => ({
      ...project,
      color: getRandomColor()
    }));
  })

  const [sortType, setSortType] = useState({ type: "created_at", order: "asc" });
  const [newProject, setNewProject] = useState({
    id: projects.length.toString(),
    name: "",
    url: "",
    rating: 1,
    created_at: ""
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  },[])

  const sortProjects = (a:Project, b:Project) => {
    const isAsc = sortType.order === "asc";
    if (sortType.type === "rating") {
      return isAsc ? a.rating - b.rating : b.rating - a.rating;
    } else {
      return isAsc ? new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf() : new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();
    }
  };

  const handleAddProject = () => {
    const newProjectData:Project = {  
      ...newProject,
      id: projects.length.toString(),
      color: getRandomColor(),
    };
    setProjects([...projects, newProjectData]);
    setNewProject({
      id: projects.length.toString(),
      name: "",
      url: "",
      rating: 1,
      created_at: ""
    });
  };

  const handleRemoveProject = (id:string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleSort = (type:string) => {
    setSortType({ type, order: sortType.order === "asc" ? "desc" : "asc" });
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Github Projects</h1>
      <ProjectForm
        newProject={newProject}
        setNewProject={setNewProject}
        handleAddProject={handleAddProject}
      />
      <div className={styles.sortBtn}>
        <Button
          onClick={() => handleSort("created_at")}
          className={styles.btn}
        >
          Sort by Date ({sortType.order})
        </Button>
        <Button
          onClick={() => handleSort("rating")}
          className={styles.btn}
        >
          Sort by Rating ({sortType.order})
        </Button>
      </div>

      <div className={styles.gridContainer}>
        {projects.sort(sortProjects).map(project => (
          <ProjectCard
            project={project}
            handleRemoveProject={handleRemoveProject}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsList