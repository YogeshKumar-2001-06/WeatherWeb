const apiKey='37dff11fda71cd9ad17597b9b069876a';
let cities = ['Delhi','Mumbai','Kolkata','Bengaluru','Chennai']
const Delhiweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[0]}&appid=${apiKey}&units=metric`;
const Mumbaiweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[1]}&appid=${apiKey}&units=metric`;
const Kolkataweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[2]}&appid=${apiKey}&units=metric`;
const Bengaluruweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[3]}&appid=${apiKey}&units=metric`;
const Chennaiweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[4]}&appid=${apiKey}&units=metric`;

fetch(Delhiweatherurl)
    .then(response => response.json())
    .then(data =>{
        popularcity(data);
    })
fetch(Mumbaiweatherurl)
    .then(response => response.json())
    .then(data =>{
        popularcity(data);
    })
fetch(Kolkataweatherurl)
    .then(response => response.json())
    .then(data =>{
        popularcity(data);
    })
fetch(Bengaluruweatherurl)
    .then(response => response.json())
    .then(data =>{
        popularcity(data);
    })
fetch(Chennaiweatherurl)
    .then(response => response.json())
    .then(data =>{
        popularcity(data);
    })

const searchInput = document.getElementById('search');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if the Enter key is pressed
        getweather();
    }
});

function getweather(){
    const apiKey='37dff11fda71cd9ad17597b9b069876a';
    const city = document.getElementById('search').value;

    if(!city){
        alert('please enter a city');
        return;
    }
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherurl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching curent weather data:',error)
            alert('Error fetching curent weather data.please try again.');
        });
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displaynextdayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching curent weather data:',error)
            alert('Error fetching curent weather data.please try again.');
        });
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);
        })
        .catch(error => {
            console.error('Error fetching curent weather data:',error)
            alert('Error fetching curent weather data.please try again.');
        });
}

function displayWeather(data){
    const curenttime = document.getElementById('time');
    const tempp = document.getElementById('temp');
    const weatherr = document.getElementById('weatherr');
    const waterwave = document.getElementById('water-wave');
    const wind = document.getElementById('wind');
    const rainfallrate = document.getElementById('rainfall-rate');
    const weathericondiv = document.getElementById('weather-icon1');
    
    curenttime.innerText = '';
    tempp.innerText = '';
    weatherr.innerText = '';
    waterwave.innerText = '';
    wind.innerText = '';
    rainfallrate.innerText = '';
    weathericondiv.innerHTML = '';


    const datetime = new Date(data.dt * 1000); 
    const currentTime = datetime.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    const tempset = Math.round(data.main.temp)
    const weatherset = data.weather[0].description;
    const waterwaves = data.main.pressure;
    const windspeed = data.wind.speed;
    const windspeedcal = (windspeed*3.6).toFixed(2);
    const iconcode = data.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
    let rainrates;
    if(data.rain && data.rain["1h"]){
        rainrates = data.rain["1h"];
    }else{
        rainrates = `___`;
    }
    const curenttimeHTML = `${currentTime}`;
    const temperatureHtml = `${tempset} °C`;
    const weatherHtml = `${weatherset}`;
    const waterhtml = `${waterwaves}`;
    const windhtml = `${windspeedcal}km/h`
    const rainrate = `${rainrates}mm/hr`
    const weatherdiv = `<img src="${iconurl}" alt="hourly weather icon">`;


    curenttime.innerText = curenttimeHTML;
    tempp.innerText=temperatureHtml;
    weatherr.innerText = weatherHtml;
    waterwave.innerText = waterhtml;
    wind.innerText = windhtml;
    rainfallrate.innerText = rainrate;
    weathericondiv.innerHTML = weatherdiv;

    console.log(currentTime)
}

function popularcity(data){
    const cities = document.getElementById('popular-cities-weather');
    
    const iconcode = data.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;
    var cityname = data.name;
    const description = data.weather[0].description;

    const cityhtml = `<span >                            
                            <div>
                                <img src="${iconurl}" alt="hourly weather icon"> 
                                <h3>${cityname}</h3>
                            </div>
                            <div class="desc-alt">
                                <center><h3>${description}</h3></center>
                            </div>
                        </span>
                        `
    cities.innerHTML +=cityhtml;


}

function displaynextdayForecast(data) {
    const weatherforecastcontainer = document.getElementById('nextdayforecast');
    weatherforecastcontainer.innerHTML = '';

    let dailyData = [];
    let currentDay = null;

    data.list.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const day = datetime.toLocaleDateString('en-US', { weekday: 'short' });
        const date = datetime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (currentDay !== date) {
            currentDay = date;
            dailyData.push({ date, day, temps: [] });
        }

        const maxtemp = Math.round(item.main.temp_max);
        const mintemp = Math.round(item.main.temp_min);
        dailyData[dailyData.length - 1].temps.push({ maxtemp, mintemp, day, date });
    });

    dailyData.slice(1, 6).forEach(dayForecast => {
        const weathericon = data.list[0].weather[0].icon;
        const weathericonurl = `https://openweathermap.org/img/wn/${weathericon}.png`;
        
        const maxtemp = Math.round(dayForecast.temps[0].maxtemp);
        const mintemp = Math.round(dayForecast.temps[0].mintemp);

        const forcastHtml = `<div class="weather-item">
                                <img src="${weathericonurl}" alt="Weather Icon">
                                <div>
                                    <p>${maxtemp}°C / ${mintemp}°C</p>
                                    <p class="date" style="margin-left: 20px;">${dayForecast.day}, ${dayForecast.date}</p>
                                </div>
                            </div>`;
        weatherforecastcontainer.innerHTML += forcastHtml;
    });
}

function displayHourlyForecast(hourlyData) {
    const hourlyforecast = document.getElementById('hourforecast');
    const title = document.getElementById('hourforecast-title');
    title.innerHTML = ''

    const cityname = hourlyData.city.name;
    const today = hourlyData.list[0].dt_txt;
    const titlehtml = `
                    <h3>Summery</h3>
                    <h2>${cityname}</h2>
                    <h3>${today}</h3>
    `;
    title.innerHTML = titlehtml;
    const next24hours = hourlyData.list.slice(0,8);

    next24hours.forEach(item =>{
        const datetime = new Date(item.dt *1000);
        const hour = datetime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;
        const hourlyforecastHtml = `
            <div class="hourly-item">
                <span>Temp: ${temperature}°C</span>
                <img src="${iconurl}" alt="hourly weather icon">
                <span>Time : ${hour}:00</span>
            </div>
        `;
        hourlyforecast.innerHTML +=hourlyforecastHtml;

    })

    
};
