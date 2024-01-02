var apiKey = "6afc5dcf66fc850fb1b7d0d8ed385321";
var stateInput = document.getElementById('statesearch-bar');
var cityInput = document.getElementById('search-bar');
var countryInput = document.getElementById('countrysearch-bar');
var searchBtn = document.getElementById("search-button");
var searchList = document.getElementById('search-list');
var currentDay = document.getElementById('currentDay');
var forecastList = document.getElementById('forecast-list');
var todayEl = document.getElementById('date');
//when button is clicked function for city search commences and then is saved in the history list

function displayWeather (){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"," +stateInput.value+","+countryInput.value + "&appid=" + apiKey+"&units=imperial";
    //console.log(requestUrl);

    fetch(requestUrl)
    .then (function(response){
       // console.log(response);
        return response.json();
    })
    .then(function (data){
        // console.log(data);
        //display city name
        currentDayTitle.textContent = cityInput.value;
        //date
        todayEl.textContent = `Date: ${dayjs().format('MM/DD/YYYY')}`;
        //temp
        var temp = currentDay.appendChild(document.createElement('li'));
        temp.textContent = "Temp: " +data.main.temp;
        //wind
        var wind = currentDay.appendChild(document.createElement('li'));
        wind.textContent = "Wind: " +data.wind.speed;
        //humidity
        var humidity = currentDay.appendChild(document.createElement('li'));
        humidity.textContent = "Humidity: " +data.main.humidity +"%";
        //icon
        var weatherIcon = currentDay.appendChild(document.createElement('li'));
        //weathericon.textContent = "Icon:";

        var iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.innerHTML = `Icon: <img scr=${iconUrl} alt=${data.weather[0].description}>`;
    })
    displayForecast();
    saveSearch();
};
//search button
searchBtn.addEventListener('click', displayWeather);

//add to displaywether after complete
function displayForecast (){
var limit = 1;
var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityInput.value+","+stateInput.value+","+countryInput.value+"&limit="+limit+"&appid="+apiKey+"&units=imperial";
//recieve lat & lon
fetch(requestUrl)
.then (function(response){
    return response.json();
})
.then (function (data){
    // console.log(data);

    var lat = data[0].lat;
    var lon = data[0].lon;
    //console.log(lat);
    // console.log(lon);
    var requestUrl2 = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat +"&lon="+lon+"&appid="+apiKey+"&units=imperial";

    //receieve 5 day forcast 

    fetch(requestUrl2)
    .then(function(response){
        return response.json();
    })
    .then (function(data2){
    //console.log(data2);
    //selects each day of the forecast list
    var filteredList = data2.list.filter(function(value,index,array){return index % 8==0;});

    for (var i=0; i < filteredList.length; i++){
        //date
        var forecastDate = forecastList.appendChild(document.createElement('li'));
        console.log(`Date: ${dayjs(filteredList[i].dt_txt).format('MM/DD/YYYY')}`);
        forecastDate.textContent = `Date: ${dayjs(filteredList[i].dt_txt).format('MM/DD/YYYY')}`;

        //icon
        var forecastIcon = forecastList.appendChild(document.createElement('li'));
        console. log(`Icon: https://openweathermap.org/img/wn/${filteredList[i].weather[0].icon}@2x.png`);
        var iconUrl = `https://openweathermap.org/img/wn/${filteredList[i].weather[0].icon}@2x.png`;
        forecastIcon.innerHTML = `Icon: <img scr=${iconUrl} alt=${filteredList[i].weather[0].description}>`;

        //temp
        var forecastTemp = forecastList.appendChild(document.createElement('li'));
        console.log(`Temp: ${filteredList[i].main.temp}`);
        forecastTemp.textContent = `Temp: ${filteredList[i].main.temp}`;

        //wind
        var forecastWind = forecastList.appendChild(document.createElement('li'));
        console.log(`Wind Speed: ${filteredList[i].wind.speed} mph`);
        forecastWind.textContent = `Wind Speed: ${filteredList[i].wind.speed} mph`;

        //humidity
        var forecastHumid = forecastList.appendChild(document.createElement('li'));
        console.log(`Humidity: ${filteredList[i].main.humi} mph`);
        forecastHumid.textContent = `Humidity: ${filteredList[i].main.humidity} mph`;
    }
    })
});


}
//show city searches****
function saveSearch(){
event.preventDefault();
var city = cityInput.value;
localStorage.setItem('city',JSON.stringify(city));
};

function printSavedSearch(){
var lastSearch = JSON.parse(localStorage.getItem('city'));
if (lastSearch !=- null){
    
}
};

//city search is added to an array
    //city is saved to local storage
//then array is printed on screen
    //grabbed from local storage