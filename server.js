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
  res.json({ greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  if(!req.params.date) {
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    });
  }

  let date;
  if (Number(req.params.date)) {
    date = new Date(Number(req.params.date));
  } else {
    date = new Date(req.params.date);
  }
  console.log(
    date,
    req.params.date,
    date instanceof Date,
    typeof date,
    date.toString()
  );

  if (date.toString() !== "Invalid Date") {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
  }
  
  if (date.toString() === "Invalid Date") {
    res.json({
      error : "Invalid Date"
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
