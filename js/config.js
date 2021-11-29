import { initializeApp } from 'firebase/app';

var config =
 {
    apiKey: "AIzaSyCwk3LpzmfZptO78BKWS4YIPW_YTHR31NI",
    authDomain: "authwithfirebase-1.firebaseapp.com",
    projectId: "authwithfirebase-1",
    storageBucket: "authwithfirebase-1.appspot.com",
    messagingSenderId: "477033394428",
    appId: "1:477033394428:web:bee307574bc9c11c5e2779",
    measurementId: "G-ZK0S7ER1B7"
 };

  const app = initializeApp(firebaseConfig);

/*
window._config = {
    cognito: {
        userPoolId: 'us-east-1_i8yMfJkaO', // e.g. us-east-2_uXboG5pAb
        userPoolClientId: '48sq451a6o1068h8ancsgdb3i8', // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
        region: 'us-east-1' // e.g. us-east-2
    },
    api: {
        invokeUrl: 'https://8q4muu2mui.execute-api.us-east-1.amazonaws.com/prod' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
    }
}; 
*/