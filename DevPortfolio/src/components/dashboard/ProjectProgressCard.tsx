import React from 'react';
import styles from './ProjectProgressCard.module.css';

interface ProjectProgressCardProps {
  projectName: string;
  progress: number;
  status: string;
  dueDate: string;
}

const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ projectName, progress, status, dueDate }) => {
  return (
    <div className={styles.card}>
      <h4>{projectName}</h4>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.details}>
        <span>{progress}%</span>
        <span>{status}</span>
        <span>Vencimento: {dueDate}</span>
      </div>
    </div>
  );
};

export default ProjectProgressCard;
