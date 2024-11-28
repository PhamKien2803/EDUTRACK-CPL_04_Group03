// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrSlfeHordSZNJ1tGZlL0Ab1IQ6C5_SR4",
    authDomain: "chat-b8997.firebaseapp.com",
    projectId: "chat-b8997",
    storageBucket: "chat-b8997.firebasestorage.app",
    messagingSenderId: "229099324840",
    appId: "1:229099324840:web:f48bf3fb2ad425a2d1499d",
    measurementId: "G-LCFPHMRPJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const signUp = async (username: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "hey,hello ",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })

    }
    catch (error: any) {
        console.log(error);
        toast.error(error.code)
    }

}

const login = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error: any) {
        console.log(error);
        toast.error(error.code)
    }

}

const logout = async () => {
    try {
        await signOut(auth)
    }
    catch (error: any) {
        toast.error(error.code)
    }
}

export { signUp, login, logout, auth, db }