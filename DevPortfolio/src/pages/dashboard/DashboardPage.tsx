import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import styles from './DashboardPage.module.css';
import { FaArchive, FaCheckCircle, FaRegClock, FaFileAlt } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      icon: FaArchive,
      label: 'Total de Projetos',
      value: '3',
      details: '+2 este mês',
      iconBgColor: '#3B82F6',
    },
    {
      icon: FaCheckCircle,
      label: 'Projetos Concluídos',
      value: '1',
      details: '33% taxa de conclusão',
      iconBgColor: '#10B981',
    },
    {
      icon: FaRegClock,
      label: 'Stories Ativas',
      value: '0',
      details: '3 total',
      iconBgColor: '#F59E0B',
    },
    {
      icon: FaFileAlt,
      label: 'ADRs Documentados',
      value: '2',
      details: 'Decisões arquiteturais',
      iconBgColor: '#8B5CF6',
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <h1>Dashboard Profissional</h1>
        <p>Gerencie seus projetos Full Stack, documentação e histórias de usuário em um só lugar</p>
      </header>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            details={stat.details}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>
      {/* Outras seções do dashboard virão aqui */}
    </div>
  );
};

export default DashboardPage;
