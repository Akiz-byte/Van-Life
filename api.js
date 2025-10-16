import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId,
    addDoc,
    serverTimestamp
} from "firebase/firestore/lite"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

// Read Firebase config from Vite environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Optional: warn if any env variables are missing
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    // eslint-disable-next-line no-console
    console.warn(
        "Firebase environment variables are missing. Please create a .env file with VITE_FIREBASE_* values."
    )
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const auth = getAuth()
    const uid = auth.currentUser?.uid
    if (!uid) {
        throw {
            message: "Not authenticated",
            statusText: "Unauthorized",
            status: 401
        }
    }
    const q = query(vansCollectionRef, where("hostId", "==", uid))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

//

export async function loginUser({ email, password }) {
    const auth = getAuth()
    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = res.user
    return {
        user: {
            uid: user.uid,
            email: user.email
        },
        token: await user.getIdToken()
    }
}

export async function signupUser({ fullName, email, password }) {
    const auth = getAuth()
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    if (fullName) {
        try { await updateProfile(user, { displayName: fullName }) } catch {}
    }
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || fullName || null
    }
}

export function logoutUser() {
    const auth = getAuth()
    return signOut(auth)
}

export async function rentVan(vanId) {
    const auth = getAuth()
    const uid = auth.currentUser?.uid
    if (!uid) {
        throw {
            message: "Not authenticated",
            statusText: "Unauthorized",
            status: 401
        }
    }

    // Get the original van details
    const vanDoc = await getVan(vanId)
    
    // Create a new van document for the user (rental copy)
    const rentalVan = {
        name: vanDoc.name,
        price: vanDoc.price,
        description: vanDoc.description,
        imageUrl: vanDoc.imageUrl,
        type: vanDoc.type,
        hostId: uid, // Set the current user as the host
        originalVanId: vanId, // Keep reference to original
        rentedAt: serverTimestamp()
    }

    // Add the rental van to the vans collection
    const docRef = await addDoc(vansCollectionRef, rentalVan)
    
    return {
        ...rentalVan,
        id: docRef.id
    }
}