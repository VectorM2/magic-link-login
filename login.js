// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  sendSignInLinkToEmail,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYYAantxH1M0BzNc25FDJp8W_KsLSTloI",

  authDomain: "login-6a0e3.firebaseapp.com",

  projectId: "login-6a0e3",

  storageBucket: "login-6a0e3.appspot.com",

  messagingSenderId: "333421496896",

  appId: "1:333421496896:web:6758d2e1715ccfe1c2eda5"

};

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reference to the "Send Magic Link" button
const sendEmailBtn = document.getElementById("send-magic-link");

// Action code settings
const actionCodeSettings = {
  url: "https://matriciq-magic-link-template.netlify.app/create-account",
  handleCodeInApp: true,
};

// Event listener for the "Send Magic Link" button
sendEmailBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Save the email locally for later use
      window.localStorage.setItem("emailForSignIn", email);
      alert("Magic link sent to your email!");

      // Hide the sign-in card and show the success card
      document.getElementById("sign-in-card").style.display = "none";
      document.getElementById("email-placeholder").textContent = email;
      document.getElementById("success-card").classList.remove("d-none");
    })
    .catch((error) => {
      // Display error message
      alert("Failed to send magic link: " + error.message);
    });
});
