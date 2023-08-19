// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA1ixMwgXMuWFM9QwKGTj2h7Q6vyBXfrgI",
    authDomain: "hacktest-4b60b.firebaseapp.com",
    projectId: "hacktest-4b60b",
    storageBucket: "hacktest-4b60b.appspot.com",
    messagingSenderId: "385463562164",
    appId: "1:385463562164:web:085fb29b86a6fc63bfcce1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize AUTH
const auth = getAuth();


const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)
async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value
        const phoneNumber = document.getElementById("phoneNumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const userType = document.getElementById("userType")

        if (!fullName || !phoneNumber || !email || !password) {
            alert("required field are missing")
            return
        }
        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            phoneNumber,
            email,
            uid,
        }
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        window.location.assign("/")
    }
    catch (error) {
        alert(error.message)
    }


}