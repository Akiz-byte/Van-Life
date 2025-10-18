import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    addDoc,
    serverTimestamp
} from "firebase/firestore/lite"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }

const vansCollectionRef = collection(db, "vans")
const quotesCollectionRef = collection(db, "quotes")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs
        .filter(d => !d.data().originalVanId)
        .map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()
    if (!data) return null
    if (data.originalVanId) {
        const origRef = doc(db, "vans", data.originalVanId)
        const origSnap = await getDoc(origRef)
        return { ...origSnap.data(), id: origSnap.id }
    }
    return { ...data, id: snapshot.id }
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

    const alreadyRented = await isVanRentedByUser(vanId)
    if (alreadyRented) {
        return null
    }

    const vanDoc = await getVan(vanId)
    
    const rentalVan = {
        name: vanDoc.name,
        price: vanDoc.price,
        description: vanDoc.description,
        imageUrl: vanDoc.imageUrl,
        type: vanDoc.type,
        hostId: uid,
        originalVanId: vanId,
        rentedAt: serverTimestamp()
    }

    const docRef = await addDoc(vansCollectionRef, rentalVan)
    
    return {
        ...rentalVan,
        id: docRef.id
    }
}

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

export async function isVanRentedByUser(vanId) {
    const auth = getAuth()
    const uid = auth.currentUser?.uid
    if (!uid) return false

    const q = query(vansCollectionRef, where("hostId", "==", uid))
    const snapshot = await getDocs(q)
    return snapshot.docs.some(d => d.data().originalVanId === vanId)
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
    const vans = snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(v => !!v.originalVanId)
    return vans
}

export async function getRandomQuote() {
    const snapshot = await getDocs(quotesCollectionRef)
    if (snapshot.empty) return null
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    const pick = items[Math.floor(Math.random() * items.length)] || {}
    const text = pick.text || pick.quote || pick.q || ""
    const author = pick.author || pick.a || ""
    if (!text) return null
    return { text, author }
}