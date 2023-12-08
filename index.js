const apiKey = "3ed712c38f8236de0bed7459c1da0300";
const weather_box = document.querySelector("#weather");
const form_search = document.querySelector("#search");
const form_elements = document.querySelector("form");

const getWeather = async (cityName) => {
    weather_box.innerHTML = "<h3> Loading... </h3>"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return showWeather(data);
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather_box.innerHTML =
            `<h2> No location Found for ${form_search.value} </h2>`;
        return;
    } else{
    weather_box.innerHTML = 
    `
        <h3> ${data.name} </h3>
       <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${Math.floor(data.main.temp)}</h2>
            <h4> ${data.weather[0].description} </h4>
        </div>
    `
    }
}

form_elements.addEventListener('submit', function (event) {
    getWeather(form_search.value)
    event.preventDefault();
})