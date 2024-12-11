import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  DocumentData,
  orderBy,
  limit,
} from 'firebase/firestore';
import type { EbiosFormData } from '../types';

const COLLECTION_NAME = 'ebios_analyses';

// Type pour les données Firestore
interface FirestoreData extends Omit<EbiosFormData, 'id'> {
  createdAt?: string;
  updatedAt?: string;
}

// Fonction utilitaire pour convertir les données Firestore
const convertFirestoreData = (data: DocumentData, docId: string): EbiosFormData => {
  const {
    createdAt,
    updatedAt,
    ...rest
  } = data as FirestoreData;

  return {
    ...rest,
    id: docId,
    context: data.context || '',
    stakeholders: data.stakeholders || [],
    businessValues: data.businessValues || [],
    threats: data.threats || [],
    fearedEvents: data.fearedEvents || [],
    scenarios: data.scenarios || [],
    risks: data.risks || [],
    actionPlans: data.actionPlans || [],
  };
};

// Fonction utilitaire pour préparer les données pour Firestore
const prepareDataForFirestore = (data: Partial<EbiosFormData>): Record<string, any> => {
  const { id, ...rest } = data as EbiosFormData & { id?: string };
  return {
    ...rest,
    updatedAt: new Date().toISOString(),
  };
};

// Sauvegarder une nouvelle analyse
export const saveAnalysis = async (data: EbiosFormData): Promise<void> => {
  try {
    await addDoc(collection(db, 'analyses'), {
      ...data,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

// Récupérer une analyse par son ID
export const getAnalysis = async (id: string): Promise<EbiosFormData | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertFirestoreData(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error getting analysis:', error);
    throw error;
  }
};

// Mettre à jour une analyse existante
export const updateAnalysis = async (id: string, data: Partial<EbiosFormData>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const firestoreData = prepareDataForFirestore(data);
    await updateDoc(docRef, firestoreData);
  } catch (error) {
    console.error('Error updating analysis:', error);
    throw error;
  }
};

// Supprimer une analyse
export const deleteAnalysis = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
};

// Récupérer toutes les analyses
export const getAllAnalyses = async (): Promise<EbiosFormData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => convertFirestoreData(doc.data(), doc.id));
  } catch (error) {
    console.error('Error getting all analyses:', error);
    throw error;
  }
};

// Rechercher des analyses par critères
export const searchAnalyses = async (field: keyof FirestoreData, value: string): Promise<EbiosFormData[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where(field, '==', value)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreData(doc.data(), doc.id));
  } catch (error) {
    console.error('Error searching analyses:', error);
    throw error;
  }
};

export const loadAnalysis = async (): Promise<EbiosFormData | null> => {
  try {
    const q = query(
      collection(db, 'analyses'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    
    if (doc) {
      return doc.data() as EbiosFormData;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading analysis:', error);
    throw error;
  }
};
