import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged,
    EmailAuthProvider 
  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'

var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
    
var signinUrl = '/signin.html';

WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var User = _auth.currentUser;
    if (User) {
        User.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            resolve(idToken.getJwtToken());
            console.log("valid token!")
          }).catch(function(error) {
            reject(err);
            console.log("invalid token!")
          }); 
    } else {
        resolve(null);
        console.log("token is null!")
    }
});

// signup
const signupForm = document.querySelector('#registrationForm');
if(signupForm)
signupForm.addEventListener('submit', (e) => {
e.preventDefault();
  
  // get user info
  const email = signupForm.querySelector('#emailInputRegister').value;
  const password = signupForm.querySelector('#passwordInputRegister').value;

  createUserWithEmailAndPassword(_auth, email, password)
  .then(cred => {
    console.log('user created:', cred.user)
    signupForm.reset()
    window.location.href = 'verify.html';
  })
  .catch(err => {
    console.log(err.message)
  })
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
  var email = loginForm.querySelector('#emailInputSignin').value;
  var password = loginForm.querySelector('#passwordInputSignin').value;

  signInWithEmailAndPassword(_auth, email, password)
  .then(cred => {
    console.log('user logged in:', cred.user)
    loginForm.reset()
    window.location.href = 'ride.html';
  })
  .catch(err => {
    console.log(err.message)
  })
});

//validate email
function verify(email, onSuccess, onFailure) {
const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);
  // Link the credential to the current user.
  linkWithCredential(_auth.currentUser, credential)
    .then((usercred) => {
      // The provider is now successfully linked.
      // The phone user can now sign in with their phone number or email.
      onSuccess(usercred);
    })
    .catch((error) => {
      // Some error occurred.
      onFailure(error)
    });
}
const unsubAuth = onAuthStateChanged(_auth, (user) => {
    console.log('user status changed:', user)
  });

  var User = _auth.currentUser;
 
  $(function onDocReady() {
    $('#signinForm').submit(handleSignin);
    $('#registrationForm').submit(handleRegister);
  //  $('#verifyForm').submit(handleVerify);
});

function handleSignin(event) {
    var email = $('#emailInputSignin').val();
    var password = $('#passwordInputSignin').val();
    event.preventDefault();
    signin(email, password,
        function signinSuccess() {
            console.log('Successfully Logged In');
            window.location.href = 'ride.html';
        },
        function signinError(err) {
            alert(err);
        }
    );
}

function handleRegister(event) {
    var email = $('#emailInputRegister').val();
    var password = $('#passwordInputRegister').val();
    var password2 = $('#password2InputRegister').val();

    var onSuccess = function registerSuccess(result) {
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
        if (confirmation) {
            window.location.href = 'verify.html';
        }
    };
    var onFailure = function registerFailure(err) {
        alert(err);
    };
    event.preventDefault();

    if (password === password2) {
        register(email, password, onSuccess, onFailure);
    } else {
        alert('Passwords do not match');
    }
}

function handleVerify(event) {
    var email = $('#emailInputVerify').val();
    var code = $('#codeInputVerify').val();
    event.preventDefault();
    verify(email, code,
        function verifySuccess(result) {
            console.log('call result: ' + result);
            console.log('Successfully verified');
            alert('Verification successful. You will now be redirected to the login page.');
            window.location.href = signinUrl;
        },
        function verifyError(err) {
            alert(err);
        }
    );
}

}(jQuery));



/*global WildRydes _config AmazonCognitoIdentity AWSCognito

var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
    var signinUrl = '/signin.html';

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

    WildRydes.signOut = function signOut() {
        userPool.getCurrentUser().signOut();
    };

    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
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

    
     *  Event Handlers
     

    $(function onDocReady() {
        $('#signinForm').submit(handleSignin);
        $('#registrationForm').submit(handleRegister);
        $('#verifyForm').submit(handleVerify);
    });

    function handleSignin(event) {
        var email = $('#emailInputSignin').val();
        var password = $('#passwordInputSignin').val();
        event.preventDefault();
        signin(email, password,
            function signinSuccess() {
                console.log('Successfully Logged In');
                window.location.href = 'ride.html';
            },
            function signinError(err) {
                alert(err);
            }
        );
    }

    function handleRegister(event) {
        var email = $('#emailInputRegister').val();
        var password = $('#passwordInputRegister').val();
        var password2 = $('#password2InputRegister').val();

        var onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
            if (confirmation) {
                window.location.href = 'verify.html';
            }
        };
        var onFailure = function registerFailure(err) {
            alert(err);
        };
        event.preventDefault();

        if (password === password2) {
            register(email, password, onSuccess, onFailure);
        } else {
            alert('Passwords do not match');
        }
    }

    function handleVerify(event) {
        var email = $('#emailInputVerify').val();
        var code = $('#codeInputVerify').val();
        event.preventDefault();
        verify(email, code,
            function verifySuccess(result) {
                console.log('call result: ' + result);
                console.log('Successfully verified');
                alert('Verification successful. You will now be redirected to the login page.');
                window.location.href = signinUrl;
            },
            function verifyError(err) {
                alert(err);
            }
        );
    }
}(jQuery));
*/