import { Button, Input, Modal, Rate } from 'antd';
import { useState } from 'react';
import { Project } from '../ProjectsList/ProjectsList';
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
  newProject: Project
  setNewProject: (project:Project) => void
  handleAddProject: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ newProject, setNewProject, handleAddProject }) => {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(true);

  const showModal = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const validateData = (newProject:Project) =>
    newProject.name && newProject.url
      ? (
        setValid(true),
        handleAddProject(),
        setOpen(false)
      ) : setValid(false)

  return (
    <div className={styles.mainContainer}>
      <Button type="primary" onClick={showModal}>
        + Add
      </Button>
      <Modal
        title="Title"
        open={open}
        onCancel={handleCancel}
        onOk={() => {
          validateData(newProject)
        }}
      >
        <div>
          <Input
            status={valid ? undefined: "error"}
            className={styles.input}
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
          />
          <Input
            status={valid ? undefined: "error"}
            className={styles.input}
            type="url"
            placeholder="Project URL"
            value={newProject.url}
            onChange={e => setNewProject({ ...newProject, url: e.target.value })}
          />
          <Input
            className={styles.input}
            type="date"
            value={newProject.created_at}
            onChange={e => setNewProject({ ...newProject, created_at: e.target.value })}
          />
          <Rate
            value={newProject.rating}
            onChange={e => setNewProject({ ...newProject, rating: e })}
          />
        </div>
      </Modal>
    </div>
  )

}

export default ProjectForm