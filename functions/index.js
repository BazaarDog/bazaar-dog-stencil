const fetch = require('node-fetch');
const cors = require('cors')({origin: true});

const fs = require('fs');


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  console.log(matches[2]);
  response.data = new Buffer(matches[2], 'base64');

  return response;
};

exports.vision = functions.https.onRequest((request, response) => {
  const data = JSON.parse(request.body);

  const image = decodeBase64Image(data.image);
  console.log(image);

  fs.writeFile('/tmp/image.jpeg', image.data, (err) => {
    if (err) {
      console.error(err);
    } else {
      visionApi.detectText('/tmp/image.jpeg', (err, images, apiResponse) => {
        if (err) {
          console.error(err);
        } else {
          console.log(images);
          console.log(apiResponse.webDetection);
    
          response.send(images);
        }
      })
    }
  })
});