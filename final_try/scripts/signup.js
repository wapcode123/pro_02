var Login = () => {
  window.location.assign("../pages/login.html");
};

const Name = document.getElementById("Name");
const gender = document.getElementById("gender");
const Email = document.getElementById("email");
const age = document.getElementById("age");
const departure = document.getElementById("departure");
const destination = document.getElementById("destination");
const Password = document.getElementById("password");
const ReEnterPassword = document.getElementById("Repassword");
const message = document.getElementById("message");

const regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

const isStrongPassword = (password) => {
  if (password.length < 8) {
    return "Password must contain at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter";
  }
  if (!/\d/.test(password)) {
    return "Password must include at least one digit";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must include at least one special character";
  }
  // Check if the password contains only words
  if (!/^(?=.*[^\w\s]).+$/.test(password)) {
    return "Password cannot consist of letters only";
  }
  return true;
};

const SignUp = () => {
  if (Name.value === "") {
    message.innerHTML = "Name Required!";
    message.style.color = "red";
  } else if (gender.value === "") {
    message.innerHTML = "Gender Required!";
    message.style.color = "red";
  } 
  else if (age.value === "") {
    message.innerHTML = "Age Required!";
    message.style.color = "red";
  } else if (parseInt(age.value) <= 22) {
    message.innerHTML = "Age must be more than 22!";
    message.style.color = "red";
  }
  else if (departure.value === "") {
    message.innerHTML = "Departure Required!";
    message.style.color = "red";
  } else if (destination.value === "") {
    message.innerHTML = "Destination Required!";
    message.style.color = "red";
  } else if (Email.value === "") {
    message.innerHTML = "Email Address Required!";
    message.style.color = "red";
  } else if (!Email.value.match(regex)) {
    message.innerHTML = "Please Enter Correct Email Address";
    message.style.color = "red";
  } else {
    const passwordFeedback = isStrongPassword(Password.value);
    if (passwordFeedback !== true) {
      message.innerHTML = passwordFeedback;
      message.style.color = "red";
      return; 
    }
    if (Password.value.length < 6) {
      message.innerHTML = "Please Enter at least 6 digit Password";
      message.style.color = "red";
    }  else if (ReEnterPassword.value === "") {
    message.innerHTML = "Re Enter Password Required";
    message.style.color = "red";
  } else if (ReEnterPassword.value !== Password.value) {
    message.innerHTML = "Passwords do not match";
    message.style.color = "red";
  } else {

    firebase
      .auth().createUserWithEmailAndPassword(Email.value, Password.value).then((userCredential) => {

        var d = new Date().toLocaleDateString();

        var userdata = {
          Name: Name.value,
          gender: gender.value,
          age: age.value,
          departure: departure.value,
          destination: destination.value,
          Email: Email.value,
          Password: Password.value,
          ReEnterPassword: ReEnterPassword.value,
          uid: userCredential.user.uid, 
          medialink:"",
          ProfilePicture: "",
          CoverPicture: "",
          Description: "",
          Signupdate: `${d}`,
        };


        firebase.firestore().collection("users").doc(userCredential.user.uid).set(userdata).then((res) => {
          console.log("Document successfully written!"); 
          message.innerHTML = "Account was created successfully";
            message.style.color = "green";
            const user = firebase.auth().currentUser;
            
              user.sendEmailVerification().then((res) => {
              setTimeout(() => {
                window.location.assign("../pages/emailverify.html");
              }, 2000);
            });
          });
        message.innerHTML = "Sign Up Successfully";
        message.style.color = "green";
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        message.innerHTML = "Error creating account. Please try again later.";
        message.style.color = "red";
    });
    
  }
}
}