const express = require('express');
const app = express();
const port = 3000;

const TOKEN_PATH = "./tokens.json";

var tokens = require(TOKEN_PATH);
const account_sid = tokens.sid;
const auth_token = tokens.token;

const messaging_response = require('twilio').twiml.MessagingResponse;
const client = require('twilio')(account_sid,auth_token);

app.post('/sms',(req, res) => {
    const twiml = new messaging_response();
    console.log(req);
    twirl.message('happy thought reply');
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
