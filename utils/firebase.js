var serviceAccount = require("./lahacksapp-firebase-adminsdk-psvcz-9144d45011.json");
var admin = require("firebase-admin");  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lahacksapp.firebaseio.com"
});

module.exports = admin;