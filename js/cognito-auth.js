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

  // sign up the user
    _auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    signupForm.reset();
  });
});

// logout

WildRydes.signOut = function signOut() {
    //userPool.getCurrentUser().signOut();
    _auth.signOut().then(() => {
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

  // log the user in
  _auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // reset form
    loginForm.reset();
  });

});


_auth.onAuthStateChanged((user) =>{
    if(user){
        store.dispatch('setUser', user);
    }else{
        store.dispatch('setUser', null);
    }
  });

WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var User = _auth.currentUser;
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












/*global WildRydes _config AmazonCognitoIdentity AWSCognito





    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

   

   

    
     * Cognito User Pool functions
  

    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        userPool.signUp(toUsername(email), password, [attributeEmail], null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    function signin(email, password, onSuccess, onFailure) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password
        });

        var cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    }

    function verify(email, code, onSuccess, onFailure) {
        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(email),
            Pool: userPool
        });
    }

    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    
    */
