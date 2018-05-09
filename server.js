const express = require("express");
const app = express();
const port = 8080;
const request = require("request");
const bodyParser = require("body-parser");
const pug = require("pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("."));
app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/", function(req, res) {
  let city = req.body.city;
  const apiKey = "f9691bbd26d5857cfafb0e83a1e186c9";
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},us&mode=json&appid=${apiKey}&units=imperial`;

  console.log("city:", city, "url: ", url);
  request(url, function(err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "no go" });
    } else {
      let weather = JSON.parse(body);

      if (weather.message == undefined) {
        console.log("weather message undefined");
        res.render("index", {
          weather: null,
          error: "Error, please try again "
        });
      } else {
        let epochTime0 = new Date(weather.list[5].dt * 1000);
        let epochTime1 = new Date(weather.list[13].dt * 1000);
        let epochTime2 = new Date(weather.list[20].dt * 1000);
        let epochTime3 = new Date(weather.list[28].dt * 1000);
        let epochTime4 = new Date(weather.list[36].dt * 1000);
        // console.log("listtime: ", weather.list[44].dt);
        console.log("epochtime: ", epochTime4);
        let newDate0 = epochTime0.getMonth();
        let newDate1 = epochTime1.getMonth();
        let newDate2 = epochTime2.getMonth();
        let newDate3 = epochTime3.getMonth();
        let newDate4 = epochTime4.getMonth();
        console.log("get Month: ", newDate4);

        let day0 = epochTime0.getDate();
        let day1 = epochTime1.getDate();
        let day2 = epochTime2.getDate();
        let day3 = epochTime3.getDate();
        let day4 = epochTime4.getDate();

        const openweathermap = "http://openweathermap.org/img/w/";
        let iconUrl0 =
          openweathermap + weather.list[5].weather[0].icon + ".png";
        let iconUrl1 =
          openweathermap + weather.list[13].weather[0].icon + ".png";
        let iconUrl2 =
          openweathermap + weather.list[20].weather[0].icon + ".png";
        let iconUrl3 =
          openweathermap + weather.list[28].weather[0].icon + ".png";
        let iconUrl4 =
          openweathermap + weather.list[36].weather[0].icon + ".png";

        function getMonthString(num) {
          var month; //Create a local variable to hold the string
          switch (num) {
            case 0:
              month = "Jan";
              break;
            case 1:
              month = "Feb";
              break;
            case 2:
              month = "Mar";
              break;
            case 3:
              month = "Apr";
              break;
            case 4:
              month = "May";
              break;
            case 5:
              month = "Jun";
              break;
            case 6:
              month = "Jul";
              break;
            case 7:
              month = "Aug";
              break;
            case 8:
              month = "Sep";
              break;
            case 9:
              month = "Oct";
              break;
            case 10:
              month = "Nov";
              break;
            case 11:
              month = "Dec";
              break;
            default:
              month = "Invalid month";
          }
          return month;
        }

        res.render("display", {
          humidity0: weather.list[5].main.humidity,
          humidity1: weather.list[13].main.humidity,
          humidity2: weather.list[20].main.humidity,
          humidity3: weather.list[28].main.humidity,
          humidity4: weather.list[36].main.humidity,
          description0: weather.list[5].weather[0].description,
          description1: weather.list[13].weather[0].description,
          description2: weather.list[20].weather[0].description,
          description3: weather.list[28].weather[0].description,
          description4: weather.list[36].weather[0].description,
          date0: getMonthString(newDate0),
          date1: getMonthString(newDate1),
          date2: getMonthString(newDate2),
          date3: getMonthString(newDate3),
          date4: getMonthString(newDate4),
          day0: day0,
          day1: day1,
          day2: day2,
          day3: day3,
          day4: day4,
          temp0: weather.list[5].main.temp.toFixed(0),
          temp1: weather.list[13].main.temp.toFixed(0),
          temp2: weather.list[20].main.temp.toFixed(0),
          temp3: weather.list[28].main.temp.toFixed(0),
          temp4: weather.list[36].main.temp.toFixed(0),
          icon0: iconUrl0,
          icon1: iconUrl1,
          icon2: iconUrl2,
          icon3: iconUrl3,
          icon4: iconUrl4,
          city: weather.city.name,
          state: "California",
          error: null
        });
      }
    }
  });
});

app.listen(port, () => console.log(`Server running onport ${port} `));
