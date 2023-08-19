
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1ixMwgXMuWFM9QwKGTj2h7Q6vyBXfrgI",
  authDomain: "hacktest-4b60b.firebaseapp.com",
  projectId: "hacktest-4b60b",
  storageBucket: "hacktest-4b60b.appspot.com",
  messagingSenderId: "385463562164",
  appId: "1:385463562164:web:085fb29b86a6fc63bfcce1"
};

// Initialize Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize AUTH
const auth = getAuth();


const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click", login)
async function login(e) {
  try {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userLogin = await signInWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, "users", userLogin.user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      alert("invalid user")
      return
    }
    const userData = docSnap.data()
    localStorage.setItem("user", JSON.stringify(userData))
    window.location.assign("/dashboard.html")

  } catch (error) {
    console.log("error", error.message)

    loginBtn.className = "btn btn-danger"
    loginBtn.innerHTML = `Login`
    alert(error.message)
  }


}