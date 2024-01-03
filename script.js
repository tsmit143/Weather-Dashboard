var apiKey = "6afc5dcf66fc850fb1b7d0d8ed385321";
var stateInput = document.getElementById('statesearch-bar');
var cityInput = document.getElementById('search-bar');
var countryInput = document.getElementById('countrysearch-bar');
var searchBtn = document.getElementById("search-button");
var searchListEL = document.getElementById('search-list');
var currentDay = document.getElementById('currentDay');
var forecastList = document.getElementById('forecast-list');
var todayEl = document.getElementById('date');
var weatherArray = JSON.parse(localStorage.getItem('city')) || [];
//when button is clicked function for city search commences and then is saved in the history list

function displayWeather (){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"," +stateInput.value+","+countryInput.value + "&appid=" + apiKey+"&units=imperial";

    fetch(requestUrl)
    .then (function(response){
       // console.log(response);
        return response.json();
    })
    .then(function (data){
        $("#currentDay").empty();
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

        var iconUrl = document.createElement('img');
        iconUrl.setAttribute('src',"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
       // `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.append(iconUrl);// = `Icon: <img scr=${iconUrl} alt=${data.weather[0].description}>`;
    })
    displayForecast();
    viewCities();
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

    var lat = data[0].lat;
    var lon = data[0].lon;
    var requestUrl2 = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat +"&lon="+lon+"&appid="+apiKey+"&units=imperial";

    //receieve 5 day forcast 

    fetch(requestUrl2)
    .then(function(response){
        return response.json();
    })
    .then (function(data2){

    //selects each day of the forecast list
    var filteredList = data2.list.filter(function(value,index,array){return index % 8==0;});
$("#forecast-list").empty();
    for (var i=0; i < filteredList.length; i++){
        //date
        var forecastDate = forecastList.appendChild(document.createElement('li'));
        forecastDate.textContent = `Date: ${dayjs(filteredList[i].dt_txt).format('MM/DD/YYYY')}`;

        //icon
        var forecastIcon = forecastList.appendChild(document.createElement('li'));

        var iconUrl = document.createElement('img');
         iconUrl.setAttribute('src', "https://openweathermap.org/img/wn/" + filteredList[i].weather[0].icon + "@2x.png");
        forecastIcon.append(iconUrl); 

        //temp
        var forecastTemp = forecastList.appendChild(document.createElement('li'));

        forecastTemp.textContent = `Temp: ${filteredList[i].main.temp}`;

        //wind
        var forecastWind = forecastList.appendChild(document.createElement('li'));

        forecastWind.textContent = `Wind Speed: ${filteredList[i].wind.speed} mph`;

        //humidity
        var forecastHumid = forecastList.appendChild(document.createElement('li'));

        forecastHumid.textContent = `Humidity: ${filteredList[i].main.humidity} mph`;
    }
    })
});


}


function viewCities(){
    var newCity = $("#search-bar").val();

    if (!weatherArray.includes(newCity)){
        weatherArray.push(newCity);
        localStorage.setItem('city',JSON.stringify(weatherArray));
    }

  viewSaved();
};

function viewSaved (){
$("#search-list").empty();
    for (var i=0; i < weatherArray.length; i++){

         var savedCities = searchListEL.appendChild(document.createElement('li'));
         savedCities.textContent = weatherArray[i];
    }
};
