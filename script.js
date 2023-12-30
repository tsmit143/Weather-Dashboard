var apiKey = "6afc5dcf66fc850fb1b7d0d8ed385321";
var stateInput = document.getElementById('statesearch-bar');
var cityInput = document.getElementById('search-bar');
var countryInput = document.getElementById('countrysearch-bar');
var searchBtn = document.getElementById("search-button");
var historyList = document.getElementById('search-list');

//when button is clicked function for city search commences and then is saved in the history list

function searchCity (){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"," +stateInput.value+","+countryInput.value + "&appid=" + apiKey;
    //console.log(requestUrl);

    fetch(requestUrl)
    .then (function(response){
        console.log(response);
        return response.json();
    })
    
};

//search button
searchBtn.addEventListener('click', searchCity);

//city search is added to an array
    //city is saved to local storage
//then array is printed on screen
    //grabbed from local storage