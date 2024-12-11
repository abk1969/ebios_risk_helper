import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import type { Analysis } from '../types';

export const useAnalyses = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'analyses'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const analysesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Analysis));
      
      setAnalyses(analysesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching analyses:', error);
      toast.error('Erreur lors du chargement des analyses');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteAnalysis = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'analyses', id));
      toast.success('Analyse supprimée avec succès');
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return { analyses, loading, deleteAnalysis };
}; 