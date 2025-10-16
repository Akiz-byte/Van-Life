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

const firebaseConfig = {
  apiKey: "AIzaSyAdKInlurADOjxHQeHNQmNWQ2xLmd3FwsI",
  authDomain: "live-vans-life.firebaseapp.com",
  projectId: "live-vans-life",
  storageBucket: "live-vans-life.firebasestorage.app",
  messagingSenderId: "950507739255",
  appId: "1:950507739255:web:2426d523c135b9911e8e72"
};

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

/* 
This 👇 isn't normally something you'd need to do. Instead, you'd 
set up Firebase security rules so only the currently logged-in user 
could edit their vans.

https://firebase.google.com/docs/rules

I'm just leaving this here for educational purposes, as it took
me a while to find the `documentId()` function that allows you
to use a where() filter on a document's ID property. (Since normally
it only looks at the data() properties of the document, meaning you
can't do `where("id", "==", id))`

It also shows how you can chain together multiple `where` filter calls
*/

// export async function getHostVan(id) {
//     const q = query(
//         vansCollectionRef,
//         where(documentId(), "==", id),
//         where("hostId", "==", "123")
//     )
//     const snapshot = await getDocs(q)
//     const vans = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return vans[0]
// }

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