function onSignIn(googleUser) {

  if (!localStorage.getItem('token')) {
    const id_token = googleUser.getAuthResponse().id_token
    console.log('masuk')
    $.ajax({
      url: 'http://localhost:3000/google-login',
      method: 'POST',
      data: {
        token: id_token
      }
    })
      .done(response => {
        localStorage.setItem('token', response.token)
        console.log(localStorage.token)
      })
      .fail(err => {
        console.log(err)
      })
  }
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
    console.log('User signed out.');
  });
}
