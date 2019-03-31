var storage = require('@google-cloud/storage');
var fs = require('fs');

var gcs = storage({
  projectId: 'lahacks-236121',
  keyFilename: '../lahacks-236121-firebase-adminsdk-aen4j-0b8e17772a.json'
});


module.exports = gcs;