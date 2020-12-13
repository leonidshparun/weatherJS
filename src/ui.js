export const DOM = {
  searchBar: document.getElementById('input'),
  locationForm: document.getElementById('locationForm'),
  location: document.querySelector('#location'),
  temperature: document.querySelector('#temperature'),
  icon: document.querySelector('#icon'),
  description: document.querySelector('#description'),
  range: document.querySelector('#range'),
  feelsLike: document.querySelector('#feelsLike'),
  date: document.querySelector('#date'),
};

const calcDate = (dateOptions = {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}) => new Date().toLocaleDateString('en-US', dateOptions);

export const setCurrentWeather = (weather) => {
  DOM.location.innerText = weather.name.toUpperCase();
  DOM.temperature.innerText = `${weather.temp}°`;
  DOM.icon.setAttribute('src', weather.iconUrl);
  DOM.description.innerText = weather.description;
  DOM.range.innerText = `${weather.temp_min}° / ${weather.temp_max}°`;
  DOM.feelsLike.innerText = `Feels like ${weather.feels_like}°`;
  DOM.date.innerText = calcDate();
  DOM.searchBar.value = '';
};

export default { DOM, setCurrentWeather };
