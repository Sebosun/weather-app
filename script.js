// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


function renderWeather(mainInfo, name, countryCode){
    console.log(mainInfo, name, countryCode)
    document.getElementById('feels').textContent = `Feels: ${mainInfo.feels_like}`
    document.getElementById('humidity').textContent = `Hum.: ${mainInfo.humidity}`
    document.getElementById('temp').textContent = `Temp.: ${mainInfo.temp}`
    document.getElementById('max').textContent = `Max temp.: ${mainInfo.temp_max}`
    document.getElementById('min').textContent = `Min temp.:${mainInfo.temp_min}`
}

function fetchWeather(location){
    let apiKey = '46bd11e9595da19b2c40277e75de6acb'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`, {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);  
        renderWeather(response.main, response.name, response.sys.country);
    })
    .catch(error => console.log(error));
}



let doc = document.getElementById("feels");

fetchWeather('warsaw');