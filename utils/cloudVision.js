const axios = require('axios');
var express = require('express');
var router = express.Router();
var admin = require('./firebase');
var os = require('os');
var storage = admin.storage();
var fs = require('fs');
//var bucket = st.bucket();
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
var base64Img = require('base64-img');
var uniqueFilename = require('unique-filename');

const bucketName = "image-lahack";
const filename = uniqueFilename(os.tmpdir());

const API_KEY='AIzaSyByA-9k2y5xPqKIqBSLR4ha1GwxhZnfYPg';

router.post('/', (req, res) => {
	console.log("Upload request received!");
	var userID = req.body.userID;
	var image = req.body.image;
	var parsedImage = image.substring(image.search(',') + 1);
	axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API_KEY, {
	  	"requests":[
	    {
	      "image":{
	        "content": parsedImage
	      },
	      "features":[
	        {
	          "type":"LABEL_DETECTION",
	          "maxResults":10
	        }
	      ]
	    }
  	]
	}).then(async function (response) {
    	const results = response.data.responses[0].labelAnnotations;
    	var returnedJson = [];
    	var isFood = false;
    	await results.forEach(async (result) => {
    		console.log(result.description);
    		if(result.description === "Food") {
    			isFood = true;
    			//var curRef = st.ref().child("image/userID");
    			await base64Img.img(image, './', filename, async (err, filepath) => {
    				if(err) {
    					console.log(err);
    				} else {
    					console.log(filepath);
    		    		await storage.bucket(bucketName).upload(filepath, {
    						gzip: true,
    						metadata: {
    							cacheControl: 'public, max-age = 31536000',
    						},
    					});
    					console.log(`${filename} uploaded to ${bucketName}.`);
    					fs.unlink(filepath, (err) => {
    						if(err) {
    							console.log(err);
    						} else {
    							console.log("Temporary file has been deleted.");
    						}
    					});
    					var splitFilePath = filepath.split('/');
    					var objFileName = splitFilePath[splitFilePath.length - 1];
    					console.log(objFileName);
    					await storage.bucket(bucketName).file(objFileName).makePublic();
    					const [metadata] = await storage.bucket(bucketName).file(objFileName).getMetadata();
    					console.log(`Media link: ${metadata.mediaLink}`);
    					var returnedJson = [];
    					returnedJson.push(metadata.mediaLink);
    					res.json({returnedJson});

    				}	
    			});

    			
    			// promises.push(curRef.putString(image, 'base64url').then((snapshot) => {
    			// 	console.log('Uploaded a base64url string!');
    			// 	snapshot.ref.getDownloadURL().then((downloadURL) => {
    			// 		returnedJson.push(downloadURL);
    			// 		res.json({returnedJson});
    			// 	});
    			// }));
    			
    			
    		}
    	});
    	if(!isFood) {
    		var returnedJson = [];
    		returnedJson.push(false);
    		res.json({returnedJson});
    	}
  }).catch(function (error) {
    console.log(error);
  });
});



module.exports = router;


