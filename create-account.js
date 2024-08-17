import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoNl1aKqHhZfja9xnUwMX1gQnS-B4FGZs",

  authDomain: "matriciq-50e6e.firebaseapp.com",

  projectId: "matriciq-50e6e",

  storageBucket: "matriciq-50e6e.appspot.com",

  messagingSenderId: "288372934600",

  appId: "1:288372934600:web:6b2af4c32a72ca9bbae2fd"

  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

auth.useDeviceLanguage();

// Grab register button
const spinner = document.getElementById("spinner");
const spinnerG = document.getElementById("spinner-g");

const register = document.getElementById("register");
register.addEventListener("click", function (event) {
    spinner.style.display = "inline-block";
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const school = document.getElementById("school").value;
    const idNumber = document.getElementById("idNumber").value;
    

    createUserWithEmailAndPassword(auth, email, password,username,school,idNumber)
        .then((userCredential) => {
            const user = userCredential.user;
            // Send verification email
            sendEmailVerification(user)
                .then(() => {
                    // Save user data to Firestore
                    setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        uid: user.uid,
                        displayName : user.displayName,
                        idNumber: idNumber,
                        school: school
                    
                    })
                    .then(() => {
                        alert("Account created. Please verify your email before logging in.");
                        window.location.href = "index.html";
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        alert("Error saving user data");
                        spinner.style.display = "none";
                    });
                })
                .catch((error) => {
                    console.error("Error sending email verification: ", error);
                    alert("Error sending verification email");
                    spinner.style.display = "none";
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            spinner.style.display = "none";
        });
});

// Grab Google sign-in button
const google = document.getElementById("google");
google.addEventListener("click", function registerWithGoogle() {
    spinnerG.style.display = "inline-block";
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // Save user data to Firestore
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName || 'Not provided',
                idNumber: 'Not provided',
                school: 'Not provided'
            })
            .then(() => {
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                alert("Error saving user data");
                spinnerG.style.display = "none";
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
            spinnerG.style.display = "none";
        });
});
