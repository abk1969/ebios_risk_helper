import { db } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import {
  EbiosFormData,
  Stakeholder,
  BusinessValue,
  Threat,
  FearedEvent,
  Scenario,
  Risk,
  ActionPlan,
} from '../types';

const EBIOS_DATA_COLLECTION = 'ebiosData';

// --- Fonctions pour la collection "context" ---
export const getContext = async (): Promise<string | null> => {
 try {
     const contextRef = doc(db, 'ebiosData', 'context');
     const contextSnap = await getDoc(contextRef);
     if (contextSnap.exists()) {
     return contextSnap.data().context;
     } else {
     return null;
     }
 } catch (error) {
     console.error('Error getting context:', error);
     throw error; // Propagez l'erreur pour la gérer dans le composant
 }
 };
 
 export const setContext = async (context: string): Promise<void> => {
 try {
     const contextRef = doc(db, 'ebiosData', 'context');
     await setDoc(contextRef, { context });
 } catch (error) {
     console.error('Error setting context:', error);
     throw error;
 }
 };
// --- Fonctions pour la collection "stakeholders" ---

export const addStakeholder = async (
  stakeholder: Stakeholder,
): Promise<string> => {
  const stakeholdersRef = collection(db, 'stakeholders');
  const docRef = await addDoc(stakeholdersRef, stakeholder);
  return docRef.id;
};

export const getStakeholders = async (): Promise<Stakeholder[]> => {
  const stakeholdersRef = collection(db, 'stakeholders');
  const querySnapshot = await getDocs(stakeholdersRef);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as Stakeholder,
  );
};

export const updateStakeholder = async (
  stakeholderId: string,
  stakeholder: Partial<Stakeholder>,
): Promise<void> => {
  const stakeholderRef = doc(db, 'stakeholders', stakeholderId);
  await updateDoc(stakeholderRef, stakeholder);
};

export const deleteStakeholder = async (
  stakeholderId: string,
): Promise<void> => {
  const stakeholderRef = doc(db, 'stakeholders', stakeholderId);
  await deleteDoc(stakeholderRef);
};

// --- Fonctions pour la collection "businessValues" ---

export const addBusinessValue = async (
  businessValue: BusinessValue,
): Promise<string> => {
  const businessValuesRef = collection(db, 'businessValues');
  const docRef = await addDoc(businessValuesRef, businessValue);
  return docRef.id;
};

export const getBusinessValues = async (): Promise<BusinessValue[]> => {
  const businessValuesRef = collection(db, 'businessValues');
  const querySnapshot = await getDocs(businessValuesRef);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as BusinessValue,
  );
};

export const updateBusinessValue = async (
  businessValueId: string,
  businessValue: Partial<BusinessValue>,
): Promise<void> => {
  const businessValueRef = doc(db, 'businessValues', businessValueId);
  await updateDoc(businessValueRef, businessValue);
};

export const deleteBusinessValue = async (
  businessValueId: string,
): Promise<void> => {
  const businessValueRef = doc(db, 'businessValues', businessValueId);
  await deleteDoc(businessValueRef);
};
export const getBusinessValuesByStakeholder = async (
  stakeholderId: string,
): Promise<BusinessValue[]> => {
  const businessValuesRef = collection(db, 'businessValues');
  const q = query(
    businessValuesRef,
    where('stakeholderId', '==', stakeholderId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as BusinessValue,
  );
};

// --- Fonctions pour la collection "threats" ---

export const addThreat = async (threat: Threat): Promise<string> => {
  const threatsRef = collection(db, 'threats');
  const docRef = await addDoc(threatsRef, threat);
  return docRef.id;
};

export const getThreats = async (): Promise<Threat[]> => {
  const threatsRef = collection(db, 'threats');
  const querySnapshot = await getDocs(threatsRef);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as Threat,
  );
};

export const updateThreat = async (
  threatId: string,
  threat: Partial<Threat>,
): Promise<void> => {
  const threatRef = doc(db, 'threats', threatId);
  await updateDoc(threatRef, threat);
};

export const deleteThreat = async (threatId: string): Promise<void> => {
  const threatRef = doc(db, 'threats', threatId);
  await deleteDoc(threatRef);
};

// --- Fonctions pour la collection "fearedEvents" ---

export const addFearedEvent = async (
  fearedEvent: FearedEvent,
): Promise<string> => {
  const fearedEventsRef = collection(db, 'fearedEvents');
  const docRef = await addDoc(fearedEventsRef, fearedEvent);
  return docRef.id;
};

export const getFearedEvents = async (): Promise<FearedEvent[]> => {
  const fearedEventsRef = collection(db, 'fearedEvents');
  const querySnapshot = await getDocs(fearedEventsRef);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as FearedEvent,
  );
};

export const updateFearedEvent = async (
  fearedEventId: string,
  fearedEvent: Partial<FearedEvent>,
): Promise<void> => {
  const fearedEventRef = doc(db, 'fearedEvents', fearedEventId);
  await updateDoc(fearedEventRef, fearedEvent);
};

export const deleteFearedEvent = async (
  fearedEventId: string,
): Promise<void> => {
  const fearedEventRef = doc(db, 'fearedEvents', fearedEventId);
  await deleteDoc(fearedEventRef);
};
export const getFearedEventsByBusinessValue = async (
  businessValueId: string,
): Promise<FearedEvent[]> => {
  const fearedEventsRef = collection(db, 'fearedEvents');
  const q = query(
    fearedEventsRef,
    where('businessValueId', '==', businessValueId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as FearedEvent,
  );
};

// --- Fonctions pour la collection "scenarios" ---

export const addScenario = async (scenario: Scenario): Promise<string> => {
  const scenariosRef = collection(db, 'scenarios');
  const docRef = await addDoc(scenariosRef, scenario);
  return docRef.id;
};

export const getScenarios = async (): Promise<Scenario[]> => {
  const scenariosRef = collection(db, 'scenarios');
  const querySnapshot = await getDocs(scenariosRef);
  return querySnapshot.docs.map(
    doc => ({ id: doc.id, ...doc.data() }) as Scenario,
  );
};

export const updateScenario = async (
  scenarioId: string,
  scenario: Partial<Scenario>,
): Promise<void> => {
  const scenarioRef = doc(db, 'scenarios', scenarioId);
  await updateDoc(scenarioRef, scenario);
};

export const deleteScenario = async (scenarioId: string): Promise<void> => {
  const scenarioRef = doc(db, 'scenarios', scenarioId);
  await deleteDoc(scenarioRef);
};

// --- Fonctions pour la collection "risks" ---

export const addRisk = async (risk: Risk): Promise<string> => {
  const risksRef = collection(db, 'risks');
  const docRef = await addDoc(risksRef, risk);
  return docRef.id;
};

export const getRisks = async (): Promise<Risk[]> => {
  const risksRef = collection(db, 'risks');
  const querySnapshot = await getDocs(risksRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Risk);
};

export const updateRisk = async (
  riskId: string,
  risk: Partial<Risk>,
): Promise<void> => {
  const riskRef = doc(db, 'risks', riskId);
  await updateDoc(riskRef, risk);
};

export const deleteRisk = async (riskId: string): Promise<void> => {
  const riskRef = doc(db, 'risks', riskId);
  await deleteDoc(riskRef);
};

export const loadEbiosData = async (): Promise<EbiosFormData | null> => {
  try {
    const ebiosDataRef = doc(db, EBIOS_DATA_COLLECTION, 'data');
    const ebiosDataSnap = await getDoc(ebiosDataRef);
    if (ebiosDataSnap.exists()) {
      return ebiosDataSnap.data() as EbiosFormData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading EBIS data:', error);
    return null;
  }
};

export const saveEbiosData = async (data: EbiosFormData): Promise<void> => {
  try {
    const ebiosDataRef = doc(db, EBIOS_DATA_COLLECTION, 'data');
    await setDoc(ebiosDataRef, data);
  } catch (error) {
    console.error('Error saving EBIS data:', error);
  }
};
