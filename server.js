
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
    
})

app.post('/', (req, res) => {
    
     const query = req.body.cityName;
     const apiKey = 'b2951ca0591e21b96c4c9e4bb3870e5a'
     const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=metric';
     https.get(url, (response) => {
         //console.log(response.statusCode);
          response.on('data', (data) => {
              //console.log(data);
              const weatherData = JSON.parse(data);
              //console.log(weatherData);
              const temp = weatherData.main.temp;
              const description = weatherData.weather[0].description;
              //console.log(description);
              res.write("<h1>The temperature in "+query+ " is "+temp+" degree celcius</h1>");
              res.write("<p>The description is " + description + "</p>");
          })
     });
})



app.listen(3000, () => {
    console.log("server starting at 3000 port");
})
