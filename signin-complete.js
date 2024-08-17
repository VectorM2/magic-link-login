import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYYAantxH1M0BzNc25FDJp8W_KsLSTloI",

  authDomain: "login-6a0e3.firebaseapp.com",

  projectId: "login-6a0e3",

  storageBucket: "login-6a0e3.appspot.com",

  messagingSenderId: "333421496896",

  appId: "1:333421496896:web:6758d2e1715ccfe1c2eda5"

  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("spinner").style.display = "block";
const email = window.localStorage.getItem("emailForSignIn");

if (isSignInWithEmailLink(auth, window.location.href)) {
  if (!email) {
    const email = window.prompt("Please provide your email for confirmation");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem("emailForSignIn");
window.location.href = "dashboard.html";
     
    })
    .catch((error) => {
      console.error("Error: ", error);
      document.getElementById("message").innerHTML =
        '<p class="error-message">Error completing sign-in. Please try again.</p>';
    })
    .finally(() => {
      document.getElementById("spinner").style.display = "none";
    });
} else {
  document.getElementById("message").innerHTML =
    '<p class="error-message">Invalid or expired link.</p>';
  document.getElementById("spinner").style.display = "none";
}
