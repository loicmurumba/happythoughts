const express = require('express');
const app = express();
const port = 3000;

const TOKEN_PATH = "./tokens.json";

var tokens = require(TOKEN_PATH);
const account_sid = tokens.sid;
const auth_token = tokens.token;
const client = require('twilio')(account_sid,auth_token);
console.log(client);

app.get('/', (req, res) => {
    res.send('Hello World!');
    client.messages
    .create({
        body: 'happy thoughts test message',
        from: tokens.src_phone,
        to: tokens.dst_phone 
    })
    .then(message => console.log(message.sid));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
