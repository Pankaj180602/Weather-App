const locationBtn = document.querySelector("#locationBtn");
const input = document.querySelector("#input");
const weatherDetails = document.querySelector(".weather-area");
const inputArea = document.querySelector(".input-area");
const leftArrow = document.querySelector(".fa-arrow-left");
const temp = document.querySelector(".num");
const temp1 = document.querySelector(".number");
const humidityTag = document.querySelector("#humidity");
const state = document.querySelector(".state");
const countryName = document.querySelector(".country");
const weatherName = document.querySelector(".weather");
const weatherImg = document.querySelector(".img-chng");




const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fc78bdcec2msh96906d1dae71d1ep1df8cdjsn96583c90b6fe',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
};

async function fetchWeather(url) {
    try {
        const response = await fetch(url, options);  //API Fetch
        const data = await response.json();

        console.log(data);


        const temperature = data.current.temp_c;     //API data access
        const humidity = data.current.humidity;
        const condition = data.current.condition.text;
        const name = data.location.name;
        const country = data.location.country;

        temp.innerText = Math.floor(temperature);    //Realtime data update on page
        temp1.innerText = Math.floor(temperature);
        humidityTag.innerText = humidity;
        state.innerText = name;
        countryName.innerText = country;
        weatherName.innerText = condition;
        weatherImg.innerHTML = `<img class='image' src='./Images/${condition}.png' alt='#'>`;
    }
    catch (error) {   //Catch ERROR
        console.error(error);
    }
}

input.addEventListener('keypress', (evt) => {         //Enter key press
    if (evt.key == 'Enter' && input.value != "") {
        let city = input.value;
        url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
        fetchWeather(url);
        weatherDetails.classList.remove("wa-hide");
        inputArea.classList.add("ia-hide");
        leftArrow.classList.remove("arrow-hide");
    }
});

leftArrow.addEventListener('click', () => {           //Left arrow click
    weatherDetails.classList.add("wa-hide");
    inputArea.classList.remove("ia-hide");
    leftArrow.classList.add("arrow-hide");
});



//Device location locate
locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%20${long}`;
        fetchWeather(url)
        weatherDetails.classList.remove("wa-hide");
        inputArea.classList.add("ia-hide");
        leftArrow.classList.remove("arrow-hide");
    })
});