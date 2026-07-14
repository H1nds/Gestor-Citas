import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
    try {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (!serviceAccount) {
            console.warn('Falta FIREBASE_SERVICE_ACCOUNT en variables de entorno.');
        } else {
            // Parsear la clave desde la variable de entorno
            const credentials = JSON.parse(serviceAccount);
            
            initializeApp({
                credential: cert(credentials)
            });
        }
    } catch (error) {
        console.error('Error inicializando Firebase Admin:', error);
    }
}

export const db = getApps().length ? getFirestore() : null;
