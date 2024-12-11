import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Analysis } from '../types';

export function useProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateProgress = async (newProgress: number) => {
    setLoading(true);
    setProgress(newProgress);
    setCurrentStep(Math.ceil(newProgress * 7)); // 7 étapes au total
    setLoading(false);
  };

  return { currentStep, progress, loading, updateProgress };
} 