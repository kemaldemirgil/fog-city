// start

// init
let city_Date = document.getElementById("city-date");
let currentTemp = document.getElementById("current-temp");
let currentHumidity = document.getElementById("current-humidity");
let currentWindSpeed = document.getElementById("current-windspeed");
let currentUV = document.getElementById("current-UV");
let enteredCity = document.getElementById("entered-city");
let searchButton = document.getElementById("search-button");
let currentIcon = document.getElementById("current-icon");
let buttonOptions = document.getElementById("button-options");
let search = document.getElementById("search");
let buttons = document.getElementsByTagName("li");
let capCity;
var fetchedData;
var oneCallData;
var listArray = [];

// displays current date & time
function displayDate_Time() {
    var theCalledObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    var cards = theCalledObj[7];
    var date = new Date(cards[0].dt * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    let printedDate = " (" + day + "/" + month + "/" + year + ")";
    city_Date.innerHTML = capCity + printedDate;
    forecastDate();
}

// gets location coordinates based on city name
function getWeather() {
    var city = enteredCity.value;
    capCity = city[0].toUpperCase() + city.slice(1);
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + capCity + '&appid=d7d5dab732ecba57b1f82869e14b868c';
    fetch(apiURL).then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                localStorage.setItem('fetchedData', JSON.stringify(data));
                fetchedData = Object.values(JSON.parse(localStorage.getItem('fetchedData')));
                // console.log(fetchedData);                 
                getWeatherForecast();
                return;
            });
        } else {
            alert("City Not Found...");
        }
    });
};

// gets one-call api using location coordinates
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
                // console.log(fetchedData);
                // console.log(oneCallData); 
                displayData();
                displayDate_Time();
                displayIcon();
                addCity();
                // for (var i = 1; i < 6; i++) {
                //     var card = $("<div>").addClass("card m-1");
                //     var cardBody = $("<div>").addClass("card-body");
                //     var cardTitle = $("<h4>").addClass("card-title").text(moment.unix(data.daily[i].dt).format("dddd, MMMM Do"));
                //     var cardText = $("<p>").addClass("card-text").text("Temp: " + data.daily[i].temp.day);
                //     var image = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                //     $("#forecastDiv").append(card.append(cardBody.append(cardTitle.append(image), cardText)));
                // }
                return;
            });
        } else {
            alert("Error");
        }
    });
};

// displays current weather icon
function displayIcon() {
    var theObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    var icons1 = theObj[7];
    var icons2 = icons1[2].weather[0].icon;
    var iconcall = 'http://openweathermap.org/img/wn/' + icons2 + '@2x.png';
    var img = document.createElement("img");
    img.setAttribute("src", iconcall);
    city_Date.append(img);
}

// displays current weather
function displayData() {
    var theCalledObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    var theFetchedObj = Object.values(JSON.parse(localStorage.getItem("fetchedData")));
    //current uv
    var uv = theCalledObj[4].uvi;
    if (uv <= 2) {
        currentUV.setAttribute("style", "background-color: #7ed16a; padding: 0.5%;")
    } else if (uv <= 6) {
        currentUV.setAttribute("style", "background-color: #e0d85d; padding: 0.5%;")
    } else if (uv > 6) {
        currentUV.setAttribute("style", "background-color: #ee6351; padding: 0.5%;")
    }
    currentUV.innerHTML = "UV Index: " + uv;
    //current temp
    var temp = parseInt(theFetchedObj[3].temp - 273.15);
    currentTemp.innerHTML = "Temperature: " + temp + "°C";
    //current humidity
    var humid = theFetchedObj[3].humidity;
    currentHumidity.innerHTML = "Humidity: " + humid + "%";
    //current wind
    var wind = parseInt(theFetchedObj[5].speed * 3.6);
    currentWindSpeed.innerHTML = "Wind Speed: " + wind + " km/h";
}

// displays 5-day forecast
function forecastDate() {
    /////////
    var theCalledObj = Object.values(JSON.parse(localStorage.getItem("oneCallData")));
    var cards = theCalledObj[7];
    /////////

    //Day1
    var date0 = new Date(cards[1].dt * 1000);
    var day0 = date0.getDate();
    var month0 = date0.getMonth() + 1;
    var year0 = date0.getFullYear();
    var card0Date = day0 + "/" + month0 + "/" + year0;
    document.getElementById("card-body-1-h5").innerHTML = card0Date;
    var temp0 = parseInt(cards[1].temp.day - 273.15);
    document.getElementById("card-body-1-temp").innerHTML = "Temp: " + temp0 + "°C";
    var humid0 = cards[1].humidity;
    document.getElementById("card-body-1-humid").innerHTML = "Humidity: " + humid0 + "%";
    var icon0 = cards[1];
    var iconcall0 = 'http://openweathermap.org/img/wn/' + icon0.weather[0].icon + '@2x.png';
    var img0 = document.createElement("img");
    img0.setAttribute("src", iconcall0);
    img0.setAttribute("style", "width:3rem");
    document.getElementById("card-body-1-h5").append(img0);

    //Day2
    var date1 = new Date(cards[2].dt * 1000);
    var day1 = date1.getDate();
    var month1 = date1.getMonth() + 1;
    var year1 = date1.getFullYear();
    var card1Date = day1 + "/" + month1 + "/" + year1;
    document.getElementById("card-body-2-h5").innerHTML = card1Date;
    var temp1 = parseInt(cards[2].temp.day - 273.15);
    document.getElementById("card-body-2-temp").innerHTML = "Temp: " + temp1 + "°C";
    var humid1 = cards[2].humidity;
    document.getElementById("card-body-2-humid").innerHTML = "Humidity: " + humid1 + "%";
    var icon1 = cards[2];
    var iconcall1 = 'http://openweathermap.org/img/wn/' + icon1.weather[0].icon + '@2x.png';
    var img1 = document.createElement("img");
    img1.setAttribute("src", iconcall1);
    img1.setAttribute("style", "width:3rem");
    document.getElementById("card-body-2-h5").append(img1);

    //Day3
    var date2 = new Date(cards[3].dt * 1000);
    var day2 = date2.getDate();
    var month2 = date2.getMonth() + 1;
    var year2 = date2.getFullYear();
    var card2Date = day2 + "/" + month2 + "/" + year2;
    document.getElementById("card-body-3-h5").innerHTML = card2Date;
    var temp2 = parseInt(cards[3].temp.day - 273.15);
    document.getElementById("card-body-3-temp").innerHTML = "Temp: " + temp2 + "°C";
    var humid2 = cards[3].humidity;
    document.getElementById("card-body-3-humid").innerHTML = "Humidity: " + humid2 + "%";
    var icon2 = cards[3];
    var iconcall2 = 'http://openweathermap.org/img/wn/' + icon2.weather[0].icon + '@2x.png';
    var img2 = document.createElement("img");
    img2.setAttribute("src", iconcall2);
    img2.setAttribute("style", "width:3rem");
    document.getElementById("card-body-3-h5").append(img2);

    //Day4
    var date3 = new Date(cards[4].dt * 1000);
    var day3 = date3.getDate();
    var month3 = date3.getMonth() + 1;
    var year3 = date3.getFullYear();
    var card3Date = day3 + "/" + month3 + "/" + year3;
    document.getElementById("card-body-4-h5").innerHTML = card3Date;
    var temp3 = parseInt(cards[4].temp.day - 273.15);
    document.getElementById("card-body-4-temp").innerHTML = "Temp: " + temp3 + "°C";
    var humid3 = cards[4].humidity;
    document.getElementById("card-body-4-humid").innerHTML = "Humidity: " + humid3 + "%";
    var icon3 = cards[4];
    var iconcall3 = 'http://openweathermap.org/img/wn/' + icon3.weather[0].icon + '@2x.png';
    var img3 = document.createElement("img");
    img3.setAttribute("src", iconcall3);
    img3.setAttribute("style", "width:3rem");
    document.getElementById("card-body-4-h5").append(img3);

    //Day5
    var date4 = new Date(cards[5].dt * 1000);
    var day4 = date4.getDate();
    var month4 = date4.getMonth() + 1;
    var year4 = date4.getFullYear();
    var card4Date = day4 + "/" + month4 + "/" + year4;
    document.getElementById("card-body-5-h5").innerHTML = card4Date;
    var temp4 = parseInt(cards[5].temp.day - 273.15);
    document.getElementById("card-body-5-temp").innerHTML = "Temp: " + temp4 + "°C";
    var humid4 = cards[5].humidity;
    document.getElementById("card-body-5-humid").innerHTML = "Humidity: " + humid4 + "%";
    var icon4 = cards[5];
    var iconcall4 = 'http://openweathermap.org/img/wn/' + icon4.weather[0].icon + '@2x.png';
    var img4 = document.createElement("img");
    img4.setAttribute("src", iconcall4);
    img4.setAttribute("style", "width:3rem");
    document.getElementById("card-body-5-h5").append(img4);
}

// adds entered city to list
function addCity() {
    var city = enteredCity.value;
    x = city[0].toUpperCase() + city.slice(1);
    if (listArray.includes(x)) {
        // console.log(listArray);
        return;
    } else if (!listArray.includes(x)) {
        listArray.push(x);
        var li = document.createElement("li");
        li.setAttribute("style", "min-width: 8rem;");
        var button = document.createElement("button");
        button.setAttribute("class", "list-group-item list-group-item-action btn-block");
        button.setAttribute("onclick", "onClicked(event)");
        button.textContent = x;
        li.appendChild(button);
        buttonOptions.appendChild(li);
    } else {
        return;
    }
}

// list item init
function onClicked(event) {
    var city = enteredCity.value;
    var z = city[0].toUpperCase() + city.slice(1);
    if (listArray.includes(z)) {
        var x = event.target;
        enteredCity.value = x.innerHTML;
        getWeather();
        // console.log(listArray);
        return;
    } else if (!listArray.includes(enteredCity.value)) {
        listArray.push(enteredCity.value);
        // console.log("city added");
    }
    // console.log(listArray);
}

// sets current value to last city value, Ottawa by default
getWeather();

// get city
searchButton.addEventListener("click", getWeather);

// end