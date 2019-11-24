const express = require('express');
const app = express();
const port = process.env.PORT || 8080; 

const TOKEN_PATH = "./tokens.json";
var responseType = 0; //0 text only

var tokens = require(TOKEN_PATH);
var lastMessage;
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
	lastMessage = req; 
    const twiml = new messaging_response();
	if(req.body.Body.includes("Hi") || req.body.Body.includes("Hey") || req.body.Body.includes("hi") || req.body.Body.includes("hey")){ 
    twiml.message('Hey! :)\n\nText WOO for motivation\n\nText ZZZ for sleep\nText RLF for relief\nText HAHA for memes\n\nText INFO for more info\n\nThink Happy Thoughts :)');
	}else if(req.body.Body.includes("WOO") || req.body.Body.includes("Woo") || req.body.Body.includes("woo")){
		if(responseType == 0){
		twiml.message("We May Encounter Many Defeats But We Must Not Be Defeated");	
		}else{
			twiml.message("GOOD MORNING!! :) https://sayingimages.com/wp-content/uploads/aaaahhh-heeeellloooo-and-good-morning-cute-memes.jpg");
		}
		
	}else if(req.body.Body.includes("ZZZ") || req.body.Body.includes("Zzz") || req.body.Body.includes("zzz")){
		if(responseType == 0){
			twiml.message("Slow down, breathe, and let go of the stressful day");
		}else{
			twiml.message("Here's some meditation for you: https://www.youtube.com/watch?v=TP2gb2fSYXY");
		}
	}else if(req.body.Body.includes("RLF") || req.body.Body.includes("Rlf") || req.body.Body.includes("rlf")){
		if(responseType == 0){
			twiml.message("Right now clouds are covering the sky and everything seems dark and overcast. It is only a matter of time before the sun is out and everything is bright and hopeful.");
		}else{
			twiml.message("Right now clouds are covering the sky and everything seems dark and overcast. It is only a matter of time before the sun is out and everything is bright and hopeful.");
		}
	}else if(req.body.Body.includes("HAHA")){
		if(responseType == 0){
			twiml.message("What happened when the strawberry attempted to cross the road??\n\nThere was a traffic jam! :)");
		}else{
			twiml.message("Meme incoming!!! https://www.memesmonkey.com/images/memesmonkey/fc/fc30eca6199ffc303b722dde7d797df2.jpeg");
		}
	}else if(req.body.Body.includes("INFO")){
		twiml.message("Please visit https://devpost.com/software/happy-thoughts-acqv95 for more info");
	}else if(req.body.Body.includes("kill") || req.body.Body.includes("suicide") || req.body.Body.includes("jump") || req.body.Body.includes("end")){
		twiml.message("Crisis Services Canada\nCALL: 1-(833)-456-4566\nTEXT: 'Start' to 45645\n\nUS National Suicide & Crisis Hotline\nCALL: 1-800-273-TALK (8255)\nTEXT: 'Hello' to 741741");
	}
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

var settingsRef = firebase.database().ref('/');

settingsRef.on('value', function(snapshot) {
    var snap = snapshot.val();
    var response = "";
    if (snap.type.includes("links")) {
        responseType = 1;
    }

    if (snap.type.includes("text")) {
		responseType = 0;
    }
	
	if(snap.type.includes("schedule"){
		if(responseType == 0){
		client.messages
		  .create({
			 body: 'Slow down, breathe, and let go of the stressful day',
			 from: '+12048195160',
			 to: '+14152542499'
		   })
		  .then(message => console.log(message.sid));
		}
		
		if(responseType == 1){
		client.messages
		  .create({
			 body: "Here's some meditation for you: https://www.youtube.com/watch?v=TP2gb2fSYXY",
			 from: '+12048195160',
			 to: '+14152542499'
		   })
		  .then(message => console.log(message.sid));
		}
		
	}
});
