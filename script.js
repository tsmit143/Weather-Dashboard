var apiKey = "6afc5dcf66fc850fb1b7d0d8ed385321";
var stateInput = document.getElementById('statesearch-bar');
var cityInput = document.getElementById('search-bar');
var countryInput = document.getElementById('countrysearch-bar');
var searchBtn = document.getElementById("search-button");
var searchList = document.getElementById('search-list');
var currentDay = document.getElementById('currentDay');
//when button is clicked function for city search commences and then is saved in the history list

function displayWeather (){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"," +stateInput.value+","+countryInput.value + "&appid=" + apiKey;
    //console.log(requestUrl);

    fetch(requestUrl)
    .then (function(response){
       // console.log(response);
        return response.json();
    })
    .then(function (data){
       // console.log(data);
        //date
        
        var today = dayjs();
        //temp
        var temp = currentDay.appendChild(document.createElement('li'));
        //wind
        var wind = currentDay.appendChild(document.createElement('li'));
        //humidity
        var humidity = currentDay.appendChild(document.createElement('li'));
        //city
        var cityTitle = document.getElementById('currentDayTitle');
        //icon
        var weathericon = currentDay.appendChild(document.createElement('li'));

        //display data
        
        currentDayTitle.textContent = cityInput.value;

        weathericon.textContent = "Icon:";

        temp.textContent = "Temp: " +data.main.temp;

        wind.textContent = "Wind: " +data.wind.speed;

        humidity.textContent = "Humidity: " +data.main.humidity +"%";
    })
    displayForecast();
    saveSearch();
};
//search button
searchBtn.addEventListener('click', displayWeather);

//add to displaywether after complete
function displayForecast (){
var limit = 1;
var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityInput.value+","+stateInput.value+","+countryInput.value+"&limit="+limit+"&appid="+apiKey;

fetch(requestUrl)
.then (function(response){
    return response.json();
})
.then (function (data){
   // console.log(data);

    var lat = data.lat;
    var lon = data.lon;

    var requestUrl2 = "api.openweathermap.org/data/2.5/forecast?lat="+lat +"&lon="+lon+"&appid="+apiKey;
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