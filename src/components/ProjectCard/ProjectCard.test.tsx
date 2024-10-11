// ProjectCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  name: string;
  url: string;
  rating: number;
  created_at: string;
  color?: string;
}

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    id: '1',
    name: 'Test Project',
    url: 'http://testproject.com',
    rating: 4,
    created_at: '2024-10-11',
    color: 'blue',
  };

  const handleRemoveProject = jest.fn();

  beforeEach(() => {
    render(<ProjectCard project={mockProject} handleRemoveProject={handleRemoveProject} />);
  });

  test('renders project details correctly', () => {
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    const projectLink = screen.getByRole('link', { name: /Test Project/i });
    expect(projectLink).toHaveAttribute('href', 'http://testproject.com');
    expect(screen.getByText('⭐️⭐️⭐️⭐️')).toBeInTheDocument();
  });

  test('calls handleRemoveProject when delete button is clicked', () => {
    const deleteButton = screen.getByRole('button', { name: '✘' });
    fireEvent.click(deleteButton);
    expect(handleRemoveProject).toHaveBeenCalledWith('1');
  });
});
