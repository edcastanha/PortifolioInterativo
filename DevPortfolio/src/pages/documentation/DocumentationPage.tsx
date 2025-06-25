import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownEditor from '../../components/documentation/MarkdownEditor';
import ADRList from '../../components/documentation/ADRList';
import ADRForm from '../../components/documentation/ADRForm';
import styles from './DocumentationPage.module.css';
import { useToast } from '../../context/ToastContext';
import { documentationService } from '../../services/documentation/documentationService';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const DocumentationPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'readme' | 'adrs'>('readme');
  const [readmeContent, setReadmeContent] = useState(documentationService.getReadme(projectId || 'default'));
  const [showADRForm, setShowADRForm] = useState(false);
  const { showToast } = useToast();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Documentação do Projeto</h1>
        <div className={styles.tabs}>
          <Tab
            label="README.md"
            isActive={activeTab === 'readme'}
            onClick={() => setActiveTab('readme')}
          />
          <Tab
            label="ADRs"
            isActive={activeTab === 'adrs'}
            onClick={() => setActiveTab('adrs')}
          />
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'readme' ? (
          <div className={styles.editorSection}>
            <MarkdownEditor
              value={readmeContent}
              onChange={(value) => setReadmeContent(value || '')}
            />
            <div className={styles.editorActions}>
              <button
                className={styles.saveButton}
                onClick={() => {
                  documentationService.saveReadme(projectId || 'default', readmeContent);
                  showToast('success', 'README salvo com sucesso!');
                }}
              >
                Salvar README
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.adrSection}>
            <div className={styles.adrHeader}>
              <h2>Registros de Decisão de Arquitetura</h2>
              <button
                className={styles.addButton}
                onClick={() => setShowADRForm(true)}
              >
                Novo ADR
              </button>
            </div>
            <ADRList />
            {showADRForm && (
              <ADRForm
                onSubmit={(data) => {
                  // O ADR já foi salvo pelo formulário
                  showToast('success', 'ADR criado com sucesso!');
                  setShowADRForm(false);
                }}
                onCancel={() => setShowADRForm(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPage;
