# 9Digital Coding Challenge

To test, post JSON data of TV shows to https://linglinglife9challenge.herokuapp.com/
* Expected JSON response to be of shows with DRM enabled (drm: true) and at least one episode (episodeCount > 0), and should have a response key with an array of shows. Each element should have the image, slug and title.
* Example request: http://codingchallenge.nine.com.au/sample_request.json

### Installing
* `npm install`

### Running application
* `npm start`

### Testing
* Run `node server.js`
* In another window, run `curl -H "Content-Type: application/json" -X POST http://localhost/ -d "@data.json"`
