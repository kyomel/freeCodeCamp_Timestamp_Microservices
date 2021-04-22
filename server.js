// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { request } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  const { params, query } = request;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let date = new Date(params.date);

  let date = new Date(params.date);

  // Handle unix timestamp,
  if (!/[^\d]/.test(params.date)) {
    date = new Date(parseInt(params.date) * 1000);
  }

  let natural = date.toLocaleDateString('en-us', options);
  let unix = date.getTime() / 1000;
  // Sends the JSON response
  res.json({
    unix: unix || null,
    natural: natural === 'Invalid Date' ? null : natural
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
