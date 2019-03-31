const axios = require('axios');
var express = require('express');
var router = express.Router();
// var gcs = require('./storage');
// var os = require('os');
// var fs = require('fs');
//var bucket = st.bucket();
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
// var base64Img = require('base64-img');
// var uniqueFilename = require('unique-filename');

// const bucketName = "image-lahack";
// const filenamePlus = uniqueFilename(os.tmpdir());
// var splitFileName = filenamePlus.split('/');
// const filename = splitFileName[splitFileName.length - 1];

// console.log(filename);

const API_KEY = require('../key');

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
	        },
	        {
	          "type":"WEB_DETECTION",
	        }
	      ]
	    }
  	]
	}).then(async function (response) {
    	const results = response.data.responses[0].labelAnnotations;
    	//console.log(response.data.responses[0]);
    	//console.log(response.data.responses[0].webDetection);
    	var guess = response.data.responses[0].webDetection.bestGuessLabels[0].label;
    	var isFood = false;
    	var returnedJson = [];
    	await results.forEach((result) => {
    		console.log(result.description);
    		returnedJson.push(result.description);
    		if(result.description === "Food") {
    			isFood = true;
    		}
    	});
 //    	axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API_KEY, {
	// 	  	"requests":[
	// 	    {
	// 	      "image":{
	// 	        "content": parsedImage
	// 	      },
	// 	      "features":[
	// 	        {
	// 	          "type":"LABEL_DETECTION",
	// 	          "maxResults":10
	// 	        },
	// 	        {
	// 	          "type":"WEB_DETETCTION",
	// 	        }
	// 	      ]
	// 	    }
 //  	]
	// }).then
    			//var curRef = storage.ref().child(filename);
    			// await base64Img.img(image, './', filename, async (err, filepath) => {
    			// 	if(err) {
    			// 		console.log(err);
    			// 	} else {
    			// 		console.log(filepath);
    			// 		var relPath = './' + filepath;
    		 //    		await storage.bucket(bucketName).upload(relPath, {
    			// 			gzip: true,
    			// 			metadata: {
    			// 				cacheControl: 'public, max-age = 31536000',
    			// 			},
    			// 		});
    			// 		console.log(`${filename} uploaded to ${bucketName}.`);
    			// 		fs.unlink(relPath, (err) => {
    			// 			if(err) {
    			// 				console.log(err);
    			// 			} else {
    			// 				console.log("Temporary file has been deleted.");
    			// 			}
    			// 		});
    			// 		var splitFilePath = relPath.split('/');
    			// 		var objFileName = splitFilePath[splitFilePath.length - 1];
    			// 		console.log(objFileName);
    			// 		await storage.bucket(bucketName).file(objFileName).makePublic();
    			// 		const [metadata] = await storage.bucket(bucketName).file(objFileName).getMetadata();
    			// 		console.log(`Media link: ${metadata.mediaLink}`);
    			// 		var returnedJson = [];
    			// 		returnedJson.push(metadata.mediaLink);
    			// 		res.json({returnedJson});

    			// 	}	
    			// });

    			
    			// curRef.putString(image, 'base64url').then((snapshot) => {
    			// 	console.log('Uploaded a base64url string!');
    			// 	snapshot.ref.getDownloadURL().then((downloadURL) => {
    			// 		returnedJson.push(downloadURL);
    			// 		res.json({returnedJson});
    			// 	});
    			// });
    			
    			
    	res.json({
    		isFood: isFood,
    		tags: returnedJson,
    		guess: guess
    	});
  }).catch(function (error) {
    console.log(error);
  });
});



module.exports = router;


