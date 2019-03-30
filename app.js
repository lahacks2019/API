var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())




app.listen(3000, function(){
   console.log("The Server Has Started!");
});