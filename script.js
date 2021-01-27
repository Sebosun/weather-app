// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// let button = document.getElementById('button');
let search = document.getElementById('input');


//renders the weather on the screen based on data
function renderWeather(mainInfo, cityName, countryCode){
    console.log(mainInfo, cityName, countryCode)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
    // basically allows me to change country code to country name
    const regionNameInEnglish = new Intl.DisplayNames(['en'], {type:'region'});
    console.log(regionNameInEnglish.of(countryCode));
    const countryName = regionNameInEnglish.of(countryCode);
    document.getElementById('location').textContent = ` ${cityName}, ${countryName}`;
    document.getElementById('feels').textContent = `Feels: ${mainInfo.feels_like}℉`;
    document.getElementById('humidity').textContent = `Hum.: ${mainInfo.humidity} %` ;
    document.getElementById('temp').textContent = `Temp.: ${mainInfo.temp}℉`;
    document.getElementById('max').textContent = `Max temp.: ${mainInfo.temp_max}℉`;
    document.getElementById('min').textContent = `Min temp.: ${mainInfo.temp_min}℉`;
}

function searchError(error){
    console.log(error);
}

// Fetches weather from the api and on success, forwards it to be rendered

function fetchWeather(location){
    let apiKey = '46bd11e9595da19b2c40277e75de6acb'
    document.getElementById('error').style = "display: none"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`, {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);  
        renderWeather(response.main, response.name, response.sys.country);
    })
    .catch(error => {
        searchError(error)
        console.log(error)
        document.getElementById('error').style = "display: block"
        document.getElementById('error').textContent = `Error. Could not find the target place.`
    });

}


//handles search function and forwards it to fetchWeather
search.addEventListener('keypress', function(e) {
    // e.preventDefault();
    if (e.key === 'Enter'){
        fetchWeather(search.value)
        search.value = ""
    }
});

fetchWeather('london');