import React from 'react';
import styles from './ADRCard.module.css';
import { FileText, CheckCircle, XCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { ADR } from '../../services/documentation/documentationService';

interface ADRCardProps {
  adr: ADR;
  onClick?: () => void;
}

const statusConfig = {
  proposed: { icon: AlertCircle, color: '#F59E0B', label: 'Proposto' },
  accepted: { icon: CheckCircle, color: '#10B981', label: 'Aceito' },
  rejected: { icon: XCircle, color: '#EF4444', label: 'Rejeitado' },
  deprecated: { icon: RotateCcw, color: '#6B7280', label: 'Depreciado' },
  superseded: { icon: FileText, color: '#8B5CF6', label: 'Substituído' },
};

const ADRCard: React.FC<ADRCardProps> = ({ adr, onClick }) => {
  const { icon: StatusIcon, color, label } = statusConfig[adr.status];

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FileText size={20} />
          <h3>{adr.title}</h3>
        </div>
        <div className={styles.status} style={{ backgroundColor: color + '20', color }}>
          <StatusIcon size={16} />
          <span>{label}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.date}>{adr.date}</span>
      </div>
    </div>
  );
};

export default ADRCard;
