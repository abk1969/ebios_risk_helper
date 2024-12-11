import React, { useState } from 'react';
import type { EbiosFormData } from '../../types';
import HelpTooltip from '../HelpTooltip';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export const ContextStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [context, setContext] = useState(data.context ?? '');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContext(newValue);
    setIsDirty(true);
  };

  const handleBlur = () => {
    if (isDirty) {
      onSubmit({ context });
      setIsDirty(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-bold">Contexte</h2>
        <HelpTooltip content="Décrivez le contexte général de votre analyse des risques" />
      </div>
      
      <textarea
        value={context}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full h-64 p-4 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder="Décrivez ici le contexte de votre analyse..."
        aria-label="Contexte de l'analyse"
      />
    </div>
  );
};
