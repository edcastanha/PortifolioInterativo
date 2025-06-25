import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ADRForm.module.css';
import MarkdownEditor from './MarkdownEditor';
import { documentationService, ADR } from '../../services/documentation/documentationService';

interface ADRFormData {
  title: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'deprecated' | 'superseded';
  context: string;
  decision: string;
  consequences: string;
  alternatives: string[];
}

interface ADRFormProps {
  onSubmit: (data: ADR) => void;
  onCancel: () => void;
}

const ADRForm: React.FC<ADRFormProps> = ({ onSubmit, onCancel }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [formData, setFormData] = useState<ADRFormData>({
    title: '',
    status: 'proposed',
    context: '',
    decision: '',
    consequences: '',
    alternatives: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newADR = {
      title: formData.title,
      status: formData.status,
      date: new Date().toISOString().split('T')[0],
      content: `# ${formData.title}\n\n## Status\n${formData.status}\n\n## Contexto\n${formData.context}\n\n## Decisão\n${formData.decision}\n\n## Consequências\n${formData.consequences}\n\n## Alternativas Consideradas\n${formData.alternatives.join('\n')}`
    };
    const savedADR = documentationService.saveADR(projectId || 'default', newADR);
    onSubmit(savedADR);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="title">Título da Decisão</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
        >
          <option value="proposed">Proposto</option>
          <option value="accepted">Aceito</option>
          <option value="rejected">Rejeitado</option>
          <option value="deprecated">Depreciado</option>
          <option value="superseded">Substituído</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Contexto</label>
        <MarkdownEditor
          value={formData.context}
          onChange={(value) => setFormData({ ...formData, context: value || '' })}
          height={200}
        />
      </div>

      <div className={styles.field}>
        <label>Decisão</label>
        <MarkdownEditor
          value={formData.decision}
          onChange={(value) => setFormData({ ...formData, decision: value || '' })}
          height={200}
        />
      </div>

      <div className={styles.field}>
        <label>Consequências</label>
        <MarkdownEditor
          value={formData.consequences}
          onChange={(value) => setFormData({ ...formData, consequences: value || '' })}
          height={200}
        />
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitButton}>
          Salvar ADR
        </button>
      </div>
    </form>
  );
};

export default ADRForm;
