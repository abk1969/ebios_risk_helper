const getEnvVar = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const env = {
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID'),
  },
  app: {
    name: getEnvVar('VITE_APP_NAME'),
    description: getEnvVar('VITE_APP_DESCRIPTION'),
    version: getEnvVar('VITE_APP_VERSION'),
    environment: getEnvVar('VITE_APP_ENVIRONMENT') as 'development' | 'staging' | 'production',
  },
} as const;

export type Env = typeof env; 