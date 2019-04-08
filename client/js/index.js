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
        postLogin()
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
    $('#navbars').show()

  });
}

function preLogin(){
  $('#dropdown-user').hide()
  $('#sign-in').show()
  $('#navbars').show()
  


}
function clear(){
  $('#sign-in').hide()
  $('#sign-out').hide()
  $('#navbars').hide()
  $('body').hide()

}

function postLogin(){
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#navbars').show()
}

function postLogout(){
  preLogin()
  $('#navbars').show()

}
function deleteTask(id){
  console.log(`masuk ini ${id}`)
  $.ajax({
    url: `http://localhost:3000/${id}`,
    method: 'DELETE',
    headers : {
      token:localStorage.token
    }
})
.done(function (response) {
    console.log(response)
  
})
.fail(function (jqXHR, textStatus) {
    console.log('request failed', textStatus)
})



}

function register(){
 
  const name = $('#register-name').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()

  $.ajax({
          url: 'http://localhost:3000/register',
          method: 'POST',
          data: {
              name,
              email,
              password              
          } 
      })
      .done(function (response) {
          console.log(response)
        
      })
      .fail(function (jqXHR, textStatus) {
          console.log('request failed', textStatus)
      })
      event.preventDefault()

}

function createTask(){ 
  console.log('create task masuk')
  const name = $('#create-name').val()
  const description = $('#create-description').val()
  const duedate= $('#create-duedate').val()
  const status = false
  $.ajax({
          url: 'http://localhost:3000/task/create',
          method: 'POST',
          data: {
              name,
              description,
              duedate,
              status              
          } ,
          headers : localStorage.token
      })
      .done(function (response) {
          console.log(response)
        
      })
      .fail(function (jqXHR, textStatus) {
          console.log('request failed', textStatus)
      })
      event.preventDefault()

}

function getDataAllDataById(){

  $.ajax({
          url: 'http://localhost:3000/task/all',
          method: 'GET',
          headers :{
            token:localStorage.token
          }
      })
      .done(function (response) {
          // console.log(response)
          postLogin()
          let daftar = ``
          response.map(resp=>{
            daftar += `<div class="p-2" style="border:10px;">
            <div class="form-check">
                <input type="radio" class="form-check-input" id="materialUnchecked"
                    name="materialExampleRadios">
                <label class="form-check-label" for="materialUnchecked">
                    <p class="font-weight-bold" style="font-size:18px;">${resp.name}</p>
                </label>
                <p class="font-italic">${resp.description}.</p>
                <p class="font-weight-lighter">9 days ago</p>
                <a href="#"  onclick="deleteTask(${resp._id});">delete</a>
            </div>
        </div>
        ` 
                  
          })
          $('#todos').append(daftar)

      })
      .fail(function (jqXHR, textStatus) {
          console.log('request failed', textStatus)
      })

}

function login(){
  event.preventDefault()

  const email = $('#login-email').val()
  const password = $('#login-password').val()
  console.log(email,password)
  $.ajax({
          url: 'http://localhost:3000/login',
          method: 'POST',
          data: {
              email,
              password              
          } 
      })
      .done(function (response) {
          // console.log(response)
          localStorage.setItem('token', response.token)
          console.log(response)
          postLogin()
      })
      .fail(function (jqXHR, textStatus) {
          console.log('request failed', textStatus)
         
      })
      event.preventDefault()

}

$(document).ready(function () {
  if(!localStorage.token){
    console.log('belom login')
    preLogin()
    $('#muncul').hide()
    
  }else{
    console.log(localStorage.token)
    console.log('udah login')
    getDataAllDataById()
    // clear()
    postLogin()
    $('#muncul').show()
  }

  $('#form-register').submit(function () {
      register()
      postLogin()
  })

  $('#form-login').submit(function () {
   
      login()
      postLogout()

  })
  $('#create-task').submit(function () {
   
    createTask()

})

 


})

