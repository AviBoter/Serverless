
var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
    
var signinUrl = '/signin.html';

// signup
const signupForm = document.querySelector('#registrationForm');
signupForm.addEventListener('submit', (e) => {
e.preventDefault();
  
  // get user info
  const email = $('email').val();
  const password = $('password').val();

  createUserWithEmailAndPassword(_auth, email, password)
  .then(cred => {
    console.log('user created:', cred.user)
    signupForm.reset()
  })
  .catch(err => {
    console.log(err.message)
  })
});

// logout

WildRydes.signOut = function signOut() {
    //userPool.getCurrentUser().signOut();
    window._auth.signOut().then(() => {
    console.log('user signed out');
  })
};

// login
const loginForm = document.querySelector('#signinForm');
if(loginForm)
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  var email = $('#emailInputSignin').val();
  var password = $('#passwordInputSignin').val();

  signInWithEmailAndPassword(_auth, email, password)
  .then(cred => {
    console.log('user logged in:', cred.user)
    loginForm.reset()
  })
  .catch(err => {
    console.log(err.message)
  })
});

const unsubAuth = onAuthStateChanged(_auth, (user) => {
    console.log('user status changed:', user)
  });

WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var User = window._currentUser;
    if (User) {
        User.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        resolve(null);
    }
});
}(jQuery));