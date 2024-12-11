import { useEffect, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { EbiosFormData } from '../types';
import { toast } from 'react-hot-toast';

export const useAutoSave = (analysisId: string, data: EbiosFormData) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await updateDoc(doc(db, 'analyses', analysisId), {
          data,
          updatedAt: new Date().toISOString()
        });
        toast.success('Sauvegarde automatique effectuée', {
          duration: 2000,
          icon: '💾'
        });
      } catch (error) {
        console.error('Error auto-saving:', error);
        toast.error('Erreur lors de la sauvegarde automatique');
      }
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [analysisId, data]);
}; 