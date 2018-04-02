const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', (request, response) => {

  if (isJson(JSON.stringify(request.body))) {

    response.statusCode = 200;
    response.send(filter(request.body.payload));

  } else {
    // If we send invalid JSON, You'll need to return a JSON response with HTTP status 400 Bad Request, ...
    response.statusCode = 400;
    // ... and with a `error` key containing the string Could not decode request.
    response.json({ error: "Could not decode request: JSON parsing failed" });
  }
});


let filter = function (payload) {
  // The returned JSON should have a response key with an array of shows
  let filteredPayload = { response: [] };

  // using for instead of foreach for performance reasons: https://jsperf.com/fast-array-foreach
  for (let i = 0; i < payload.length; i++) {

    // TODO check if objects exist?

    // return the ones with DRM enabled (drm: true)
    // and at least one episode (episodeCount > 0)
    if (payload[i] != null && payload[i].drm && payload[i].episodeCount > 0) {

      // image - corresponding to image/showImage from the request payload
      // slug
      // title
      let validShow = {
        image: payload[i].image.showImage,
        slug: payload[i].slug,
        title: payload[i].title,
      };

      filteredPayload.response.push(validShow);
    };
  };

  return filteredPayload;
};

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
      //console.log(e);
        return false;
    }
    return true;
};

app.listen(port);
