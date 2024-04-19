var SUPABASE_URL = 'https://chzaizregriqzueqdsnf.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoemFpenJlZ3JpcXp1ZXFkc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NDg1MjgsImV4cCI6MjAyNTAyNDUyOH0.qzX1fVjkYfaFtq-6QzdasJsDyQB00CslprrHPQU5QC8'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
  var signUpForm = document.querySelector('#sign-up')
  signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

  var logInForm = document.querySelector('#log-in')
  logInForm.onsubmit = logInSubmitted.bind(logInForm)

  var userDetailsButton = document.querySelector('#user-button')
  userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

  var logoutButton = document.querySelector('#logout-button')
  logoutButton.onclick = logoutSubmitted.bind(logoutButton)
})



const signUpSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signUp({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err) => {
      alert(err)
    })
}


const logInSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signIn({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
      //alert('Logged in as ' + response.user.email)  this is commented beacuase the alert for token already works
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

const fetchUserDetails = () => {
  alert(JSON.stringify(supabase.auth.user()))
}


const logoutSubmitted = (event) => {
  event.preventDefault()

  supabase.auth
    .signOut()
    .then((_response) => {
      document.querySelector('#access-token').value = ''
      document.querySelector('#refresh-token').value = ''
      alert('Logout successful')
    })
    .catch((err) => {
      alert(err.response.text)
    })
}





function setToken(response) {
  if (response.user.confirmation_sent_at && !response?.session?.access_token) {
    alert('Confirmation Email Sent')
  } else {
    document.querySelector('#access-token').value = response.session.access_token
    document.querySelector('#refresh-token').value = response.session.refresh_token
    alert('Logged in as ' + response.user.email)
  }
}

function toggleForms() {
  const signupForm = document.getElementById('sign-up');
  const loginForm = document.getElementById('log-in');

  if (signupForm.style.display === 'none') {
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
  } else {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
  }
}

function showPassword1(){
  var passwordField = document.getElementById('password1')
  if (passwordField.type === "password"){
    passwordField.type = "text"
    }else{
      passwordField.type = "password"
    }

}
function showPassword2(){
  var passwordField = document.getElementById('password2')
  if (passwordField.type === "password"){
    passwordField.type = "text"
    }else{
      passwordField.type = "password"
    }

}
// Google auth
async function signInWithGoogle() {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
      clientId: '647413052426-kmrgh7shlbihgel13gsiprq82o7m74r2.apps.googleusercontent.com',
    });
    if (error) throw error;
    console.log(user, session);
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
}

// Add click event listener to the Google Sign-In button
document.getElementById('google-sign-in1').addEventListener('click', signInWithGoogle);
document.getElementById('google-sign-in2').addEventListener('click', signInWithGoogle);

// github auth
async function signInWithGithub() {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
      clientId: '669ba9c06e0f3664cbd4',
    });
    if (error) throw error;
    console.log(user, session);
  } catch (error) {
    console.error('Error signing in with github:', error.message);
  }
}

// Add click event listener to the Google Sign-In button
document.getElementById('github-sign-in1').addEventListener('click', signInWithGithub);
document.getElementById('github-sign-in2').addEventListener('click', signInWithGithub);