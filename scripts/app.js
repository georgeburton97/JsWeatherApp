const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructured properties

const {cityDetails, weather} = data;

    // update details
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>temperature</span>
            <span>${weather.Temperature.Metric.Value}&deg;C</span>
        </div>
    `;

    // update the night and day icons

    const iconsSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconsSrc);


    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // } else {
    //     timeSrc = 'img/night.svg'
    // }
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}



cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get City Value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))


    // set local storage
    localStorage.setItem('city', city);


});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}