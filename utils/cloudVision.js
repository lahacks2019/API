const axios = require('axios');
var express = require('express');
var router = express.Router();
var storage = require('./storage');


router.post('/', (req, res) => {
	var userID = req.body.userID;
	var image = req.body.image;
	axios.post('https://vision.googleapis.com/v1/images:annotate', {
	  	"requests":[
	    {
	      "image":{
	        "content":"/9j/7QBEUGhvdG9..."+ image + "...eYxxxzj/Coa6Bax//Z"
	      },
	      "features":[
	        {
	          "type":"LABEL_DETECTION",
	          "maxResults":10
	        }
	      ]
	    }
  	]
	}).then(function (response) {
    	const results = response[0].labelAnnotations;
    	var returnedJson = [];
    	results.forEach((result) => {
    		if(result.description === "food") {
    			isFood = true;
    			curRef = storage.ref().child("image/userID");
    			curRef.putString(image, 'base64url').then((snapshot) => {
    				console.log('Uploaded a base64url string!');
    				snapshot.ref.getDownloadURL().then((downloadURL) => {
    					returnedJson.push(downloadURL);
    					res.json({returnedJson});
    				})
    			});
    		}
    	})
    	promise
    	res.json({[isFood]});
  }).catch(function (error) {
    console.log(error);
  });
});



module.export = router;


