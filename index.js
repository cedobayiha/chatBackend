let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
app.use(cors({ credentials: true, origin: "http://10.65.106.58:8080" }));
app.use(bodyParser.raw({ type: "*/*" }));

let generateId = function() {
  return "" + Math.floor(Math.random() * 100000000000);
};
let passwords = {};
let sessions = {};
let messages = [];

app.post("/newmessage", function(req, res) {
  console.log("**** we are in new message");
  console.log("**** body pre parse", req.body.toString());
  let body = JSON.parse(req.body);
  console.log("**** parsed body", body);
  let msg = body.msg;

  let sessionId = req.headers.cookie;
  let username = sessions[sessionId];
  let newMsg = { username: username, message: msg };
  console.log("here is the new msg", newMsg);
  messages = messages.concat(newMsg);
  console.log("**** the message", messages);
  res.send(JSON.stringify({ success: true }));
});
// Refers to an array
// Contains the chat messages
// Create your endpoints
app.get("/message", function(req, res) {
  res.send(JSON.stringify(messages));
});
// /newmessage
// The request body will contain the session id and the message
// Updates the array referred to by the messages variable
// Method is POST
// Console log everywhere and test with postman
// /messages
// No request body needed
// Method is GET

// Reads the messages variable
// Console log everywhere and test with postman

app.post("/signup", function(req, res) {
  console.log;
  let body = JSON.parse(req.body.toString());
  let username = body.username;
  let enteredPassword = body.password;
  passwords[username] = enteredPassword;
  console.log("username & password", username, enteredPassword);
  let responseBody = JSON.stringify({ success: true });
  res.send(responseBody);
});

app.post("/login", function(req, res) {
  let body = JSON.parse(req.body.toString());
  let username = body.username;
  let typedPassword = body.password;
  let expectedPassword = typedPassword;
  if (expectedPassword === typedPassword) {
    let sessionId = generateId();
    sessions[sessionId] = username;
    res.set("Set-Cookie", "" + sessionId);
    let responseBody = JSON.stringify({ success: true });
    res.send(responseBody);
    return;
  }
  res.send(JSON.stringify({ success: false }));
});
app.listen(4000, "10.65.106.58");
