let userprofileimg = document.getElementById("userprofileimg");

let progressbar1 = document.getElementById("progressbar");

let progressbardiv = document.getElementById("progressbardiv");

let firstName = document.getElementById("Name");
let lastname = document.getElementById("gender");
let mobilenumber = document.getElementById("age");
let email = document.getElementById("Email");
let description = document.getElementById("userdescription");
let message = document.getElementById("message");
var postsshowbutton = document.getElementById("postsbutton");
var currentuserpost = document.getElementById("showposts");
var userdata = document.getElementById("editabledatadiv");
var showuserprofilebutton = document.getElementById("userprofilebutton");
let textareaupdate = document.getElementById("textareaupdate");
let fileType = "";
let uid;
let updateurl;
let alluser = [];
let allposts = [];



// Function to get user data
const getUserData = (user) => {
  if (user && user.emailVerified) {
    uid = user.uid;
    var createpostinput = document.getElementById("a");
    firebase.firestore().collection("users").onSnapshot((result) => {
      result.forEach((users) => {
        if (users.data().uid === user.uid) {
          // Update the UI with user data
          updateUI(users.data());
        }
      });
    });
  } else {
    window.location.assign(user && !user.emailVerified ? "./email.html" : "./login.html");
  }
};

// Function to update the UI with user data
const updateUI = (userData) => {
  firstName.value = userData.FirstName || "";
  lastname.value = userData.LastName || "";
  mobilenumber.value = userData.MobileNumber || "";
  email.value = userData.Email || "";
  email.disabled = true;
  description.value = userData.Description || "";
};

// Update button
const update = () => {
  if (firstName.value === "") {
    showMessage("First Name Required", "red", firstName);
  } else if (lastname.value === "") {
    showMessage("Last Name Required", "red", lastname);
  } else if (mobilenumber.value === "") {
    showMessage("Mobile Number Required", "red", mobilenumber);
  } else {
    var data = {
      firstName: firstName.value,
      lastName: lastname.value,
      mobileNumber: mobilenumber.value,
      Description: description.value,
    };

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(data)
      .then((res) => {
        console.log(res);
        showMessage("Successfully Updated", "green");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

// Function to handle logout
const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};

// Function to show message and highlight the input field
const showMessage = (text, color, inputField) => {
  message.innerHTML = text;
  message.style.color = color;
  if (inputField) {
    inputField.focus();
  }
  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
};

// Observer for authentication state changes
firebase.auth().onAuthStateChanged(function (user) {
  getUserData(user);
});

