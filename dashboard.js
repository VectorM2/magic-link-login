
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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

  // Function to update the user profile
  function updateUserProfile(user) {
    const userName = user.displayName || "No Name Provided";
    const userEmail = user.email;
    const userProfilePicture = user.photoURL || "brand-assets/profile.png";
    const emailVerified = user.emailVerified;

    // Update the profile section with user data
    document.getElementById("displayName").textContent = userName;
    document.getElementById("email").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;

    const verificationBadge = document.getElementById("verificationStatus").querySelector("span");
    verificationBadge.textContent = emailVerified ? "Verified" : "Not Verified";
    verificationBadge.className = emailVerified ? "badge bg-success" : "badge bg-danger";
  }

  // Add the onAuthStateChanged listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, call the updateUserProfile function
      updateUserProfile(user);
      console.log(user)
    } else {
      // User is not signed in, redirect to the registration page
      alert("Create Account & login");
      window.location.href = "/register.html";
    }
  });

   // Logout function
   document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
      // Sign-out successful, redirect to the login page
      window.location.href = "/index.html";
    }).catch((error) => {
      // An error happened during sign-out
      console.error("Sign-out error:", error);
    });
  });