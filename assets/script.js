let city_Date = document.getElementById("city-date");
let currentTemp = document.getElementById("current-temp");
let currentHumidity = document.getElementById("current-humidity");
let currentWindSpeed = document.getElementById("current-windspeed");
let currentUV = document.getElementById("current-UV");
let enteredCity = document.getElementById("entered-city");
let searchButton = document.getElementById("search-button");
let currentIcon = document.getElementById("current-icon");
let firstIcon = document.getElementById("Icon-1");
let secondIcon = document.getElementById("Icon-2");
let thirdIcon = document.getElementById("Icon-3");
let forthIcon = document.getElementById("Icon-4");
let fifthIcon = document.getElementById("Icon-5");
let cardBody1 = document.getElementById("card-body-1");
let cardBody2 = document.getElementById("card-body-2");
let cardBody3 = document.getElementById("card-body-3");
let cardBody4 = document.getElementById("card-body-4");
let cardBody5 = document.getElementById("card-body-5");
let capCity;

var fetchedData;
var oneCallData;


function capitalizedCity() {
    var city = enteredCity.value;
    capCity = city[0].toUpperCase() + city.slice(1);
}

function displayDate_Time() {
    let unix_timestamp = fetchedData[7];
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    let printedDate = "(" + day + "/" + month + "/" + year + ")";
    city_Date.innerHTML = capCity + printedDate;
    forecastDate()
}

function getWeather() {
    var city = enteredCity.value;
    capCity = city[0].toUpperCase() + city.slice(1);
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + capCity + '&appid=d7d5dab732ecba57b1f82869e14b868c';
    fetch(apiURL).then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                localStorage.setItem('fetchedData', JSON.stringify(data));
                fetchedData = Object.values(JSON.parse(localStorage.getItem('fetchedData')));
                console.log((JSON.parse(localStorage.getItem("fetchedData"))));
                                
                getWeatherForecast();
                displayData();
                // selectedWindSpeed();
                // selectedHumidity();
                // selectedTemp();
                displayDate_Time();
                console.log(fetchedData);
                return;
            });
        } else {
            alert("error");
        }
    });
};


function getWeatherForecast() {
    var coords = Object.values(fetchedData[0]);
    var lon = coords[0];
    var lat = coords[1];
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=d7d5dab732ecba57b1f82869e14b868c';

    fetch(apiURL).then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                localStorage.setItem('oneCallData', JSON.stringify(data));
                oneCallData = (JSON.parse(localStorage.getItem("oneCallData")));
                console.log(oneCallData);
                displayIcon();
                return;
            });
        } else {
            alert("error");
        }
    });
};

function displayIcon() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    console.log(theObj);
    var icons1 = theObj[7];
    var icons2 = icons1[2].weather[0].icon;
    var iconcall = 'http://openweathermap.org/img/wn/' + icons2 + '@2x.png';
    var img = document.createElement("img");
    img.setAttribute("src", iconcall);
    city_Date.append(img);
}

function displayData() {
    var theCalledObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    var theFetchedObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));

    var uv = theCalledObj[4].uvi;
    console.log("UV Indev: " + uv);
    currentUV.innerHTML = "UV Indev: " + uv;

    var temp = parseInt(theFetchedObj[3].temp - 273.15);
    console.log("Temperature: " + temp);
    currentTemp.innerHTML = "Temperature: " + temp;

    var humid = theFetchedObj[3].humidity;
    console.log("Humidity: " + humid + "%");
    currentHumidity.innerHTML = "Humidity: " + humid + "%";

    var wind = parseInt(theFetchedObj[5].speed * 2.23694);
    console.log("Wind Speed: " + wind + "MPH");
    currentWindSpeed.innerHTML = "Wind Speed: " + wind + "MPH";
    
}

// function displayForecast() {

//     let unix_timestamp = fetchedData[7];
//     var date = new Date(unix_timestamp * 1000);
//     var day = date.getDate();
//     var month = date.getMonth() + 1;
//     var year = date.getFullYear();
//     let printedDate = "(" + day + "/" + month + "/" + year + ")";

//     document.getElementById("card-body-1-h5").innerHTML = "Date : " + 
// }

function forecastDate() {
    var theCalledObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));

    var cards = theCalledObj[7];

    var date = new Date(cards[0].dt * 1000);
    var day0 = date.getDate();
    var month0 = date.getMonth() + 1;
    var year0 = date.getFullYear();
    var card0Date = day0 + "/" + month0 + "/" + year0;
    document.getElementById("card-body-1-h5").innerHTML = card0Date;

    var date = new Date(cards[1].dt * 1000);
    var day1 = date.getDate();
    var month1 = date.getMonth() + 1;
    var year1 = date.getFullYear();
    var card1Date = day1 + "/" + month1 + "/" + year1;
    document.getElementById("card-body-2-h5").innerHTML = card1Date;

    var date = new Date(cards[2].dt * 1000);
    var day2 = date.getDate();
    var month2 = date.getMonth() + 1;
    var year2 = date.getFullYear();
    var card2Date = day2 + "/" + month2 + "/" + year2;
    document.getElementById("card-body-3-h5").innerHTML = card2Date;

    var date = new Date(cards[3].dt * 1000);
    var day3 = date.getDate();
    var month3 = date.getMonth() + 1;
    var year3 = date.getFullYear();
    var card3Date = day3 + "/" + month3 + "/" + year3;
    document.getElementById("card-body-4-h5").innerHTML = card3Date;

    var date = new Date(cards[4].dt * 1000);
    var day4 = date.getDate();
    var month4 = date.getMonth() + 1;
    var year4 = date.getFullYear();
    var card4Date = day4 + "/" + month4 + "/" + year4;
    document.getElementById("card-body-5-h5").innerHTML = card4Date;



}

searchButton.addEventListener("click", getWeather);