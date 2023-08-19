import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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

const logoutBtn = document.getElementById("logout")
const getUser = document.getElementById("getUser")

const productCollection = collection(db, "users")
const ProductForm = document.getElementById("productForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
window.addEventListener("load", loginUser)
const productParent = document.getElementById("productParent")
function loginUser() {
    if (localStorage.getItem("user") === null) {
        window.location.replace("../index.html")
        return
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            getUser.textContent = `${userData.fullName}`;
        }
    }
})

async function getProduct() {

    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log(doc.data())
        const getData = doc.data();
        productParent.innerHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${getData.name}</h5>
                <p class="card-text">${getData.desc}</p>
                <button class="edit-button btn btn-success">Edit</button>
                <button class="delete-button btn btn-danger">Delete</button>
            </div>
        </div>`
    })

}

async function addproduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        if (!productName || !productDesc) {
            alert("Required empty ")
            return
        }
        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
        }
        console.log("Add", productObj)

        await addDoc(productCollection, productObj)
        alert("Product Added")


    } catch (error) {
        alert(error.message)
    }

}


document.addEventListener('click', function () {
    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemText = this.parentNode.querySelector('.card-text');
            const newText = prompt('Edit the item:', itemText.textContent);
            if (newText !== null) {
                itemText.textContent = newText;
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.parentNode;
            if (confirm('Are you sure?')) {
                item.parentNode.removeChild(item);
            }
        });
    });
})