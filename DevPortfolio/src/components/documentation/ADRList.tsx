import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ADRCard from './ADRCard';
import styles from './ADRList.module.css';
import { documentationService, ADR } from '../../services/documentation/documentationService';



const ADRList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [adrs, setADRs] = useState<ADR[]>([]);

  useEffect(() => {
    const loadedADRs = documentationService.getADRs(projectId || 'default');
    setADRs(loadedADRs);
  }, [projectId]);

  return (
    <div className={styles.listContainer}>
      {adrs.map(adr => (
        <ADRCard key={adr.id} adr={adr} />
      ))}
      {adrs.length === 0 && (
        <div className={styles.emptyState}>
          <p>Nenhum ADR cadastrado ainda. Comece criando um novo registro!</p>
        </div>
      )}
    </div>
  );
};

export default ADRList;
