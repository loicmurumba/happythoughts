const express = require('express');
const app = express();
const port = process.env.PORT || 8080; 

const TOKEN_PATH = "./tokens.json";

var tokens = require(TOKEN_PATH);
const account_sid = tokens.sid;
const auth_token = tokens.token;

var firebase = require("firebase/app");

require("firebase/database");

var firebaseConfig = {
    apiKey: tokens.fbasekey,
    authDomain: "happythoughts.firebaseapp.com",
    databaseURL: "https://happythoughts.firebaseio.com",
    projectId: "happythoughts",
    storageBucket: "happythoughts.appspot.com",
    messagingSenderId: "49951684871",
    appId: "1:49951684871:web:6a775f7666dac586deeda2",
    measurementId: "G-MED6KQVRYE"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const messaging_response = require('twilio').twiml.MessagingResponse;
const client = require('twilio')(account_sid,auth_token);

app.post('/sms',(req, res) => {
    const twiml = new messaging_response();
    twiml.message('happy thought reply');
    res.writeHead(200,{'Content-Type':'text/xml'});
    res.end(twiml.toString());
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

function send_message(message) {
    client.messages
    .create({
        body: message,
        from: tokens.src_phone,
        to: tokens.dst_phone 
    })
    .then(message => console.log(message.sid));

};

app.listen(port, () => console.log(`App listening on port ${port}!`));
