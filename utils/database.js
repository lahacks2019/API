var serviceAccount = require("../lahacksapp-firebase-adminsdk-psvcz-56063e76df.json");
var admin = require("firebase-admin");  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lahacksapp.firebaseio.com"
});
var db = admin.database();
module.exports = db;