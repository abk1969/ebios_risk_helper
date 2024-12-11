import { useState, useEffect } from 'react';
import { loadAnalysis } from '../services/ebiosService';
import type { EbiosFormData } from '../types';

export const useEbiosData = () => {
  const [data, setData] = useState<EbiosFormData>({
    id: '',
    context: '',
    stakeholders: [],
    businessValues: [],
    threats: [],
    fearedEvents: [],
    scenarios: [],
    risks: [],
    actionPlans: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await loadAnalysis();
        if (savedData) {
          setData(savedData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      loadAnalysis()
        .then(savedData => {
          if (savedData) {
            setData(savedData);
          }
        })
        .catch(err => setError(err instanceof Error ? err : new Error('Failed to load data')))
        .finally(() => setIsLoading(false));
    },
  };
}; 