// api/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Evitar inicializaciones duplicadas en entornos serverless
if (!admin.apps.length) {
    try {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (!serviceAccount) {
            console.warn('Falta FIREBASE_SERVICE_ACCOUNT en variables de entorno.');
        } else {
            // Parsear la clave desde la variable de entorno
            const credentials = JSON.parse(serviceAccount);
            
            admin.initializeApp({
                credential: admin.credential.cert(credentials)
            });
        }
    } catch (error) {
        console.error('Error inicializando Firebase Admin:', error);
    }
}

export const db = admin.apps.length ? admin.firestore() : null;
