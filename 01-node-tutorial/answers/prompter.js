// Import the required modules
const http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

// Function to parse the body of the request
const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = '';
  // On data event, add the incoming data to the body
  req.on('data', function (data) {
    body += decode.write(data);
  });
  // On end event, parse the body and return the result
  req.on('end', function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split('&');
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split('=');
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// Variable to store the selected color
let color = "pink";

// Function to generate the form HTML
const form = () => {
  return `
  <body style="background-color: ${color};">
  <form method="POST">
  <label for="color">Choose a color:</label>
  <select name="color" id="color">
    <option value="white">White</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

// Create the server
const server = http.createServer((req, res) => {
  // If the request method is POST, parse the body and update the color
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["color"]) {
        color = body["color"];
      }
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    // If the request method is not POST, return the form
    res.end(form());
  }
});

// Start the server
server.listen(3000);
console.log('The server is listening on port 3000.');
