let city_Date = document.getElementById("city-date");
let currentTemp = document.getElementById("current-temp");
let currentHumidity = document.getElementById("current-humidity");
let currentWindSpeed = document.getElementById("current-windspeed");
let currentUV = document.getElementById("current-UV");
let enteredCity = document.getElementById("entered-city");
let searchButton = document.getElementById("search-button");
let currentIcon = document.getElementById("current-Icon");
let firstIcon = document.getElementById("Icon-1");
let secondIcon = document.getElementById("Icon-2");
let thirdIcon = document.getElementById("Icon-3");
let forthIcon = document.getElementById("Icon-4");
let fifthIcon = document.getElementById("Icon-5");
let capCity;

var objectValues;


// function currentCity() {
//     objectValues = Object.values(JSON.parse(localStorage.getItem('fetchedData')));
// }


function capitalizedCity() {
    var city = enteredCity.value;
    capCity = city[0].toUpperCase() + city.slice(1);
}

function displayDate_Time() {
    objectValues = Object.values(JSON.parse(localStorage.getItem('fetchedData')));
    let unix_timestamp = objectValues[7];
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    let printedDate = "(" + day + "/" + month + "/" + year + ")";
    city_Date.innerHTML = capCity + printedDate;
    getWeatherForecast();
    
    console.log(objectValues);
}



function getWeather() {
    var city = enteredCity.value;
    capCity = city[0].toUpperCase() + city.slice(1);
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + capCity + '&appid=d7d5dab732ecba57b1f82869e14b868c';
    fetch(apiURL).then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                localStorage.setItem('fetchedData', JSON.stringify(data));
                displayDate_Time();
                // getWeatherForecast();
                return;
            });
        } else {
            alert("error");
        }
    });

    
};


function getWeatherForecast() {
    var coords = Object.values(objectValues[0]);
    var lon = coords[0];
    var lat = coords[1];
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=d7d5dab732ecba57b1f82869e14b868c';

    fetch(apiURL).then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert("error");
        }
    });
};

function selectedTemp() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));
    var temp = parseInt(theObj[3].temp - 273.15);
    console.log("Temperature:" + temp);
}

function selectedHumidity() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));
    var humid = theObj[3].humidity;
    console.log("Humidity:" + humid + "%");
}

function selectedWindSpeed() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));
    var wind = parseInt(theObj[5].speed * 2.23694);
    console.log("Wind Speed:" + wind + "MPH");
}

function selectedUV() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));
    var UV;
    console.log("UV Index:" + UV);
}

// function weatherIcons() {

//     http://openweathermap.org/img/wn/10d@2x.png
// }


selectedUV();
selectedWindSpeed();
selectedHumidity();
selectedTemp();

console.log((JSON.parse(localStorage.getItem("fetchedData"))));
console.log(Object.values(JSON.parse(localStorage.getItem("fetchedData"))));
console.log(objectValues);
searchButton.addEventListener("click", getWeather);