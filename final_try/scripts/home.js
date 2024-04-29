















const logout = ()=>{
    firebase.auth().signOut().then(() => {
      window.location.assign("./login.js")
    })
  }