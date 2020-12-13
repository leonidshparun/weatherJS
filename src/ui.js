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

const calcFontSize = (length) => {
  let fs = 22;
  if (length > 16) {
    fs = 14;
  } else if (length > 10) {
    fs = 16;
  } else {
    fs = 22;
  }
  return `${fs}px`;
};

const calcDate = (dateOptions = {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}) => new Date().toLocaleDateString('en-US', dateOptions);

export const setCurrentWeather = (weather) => {
  DOM.location.style.fontSize = calcFontSize(weather.name.length);
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
