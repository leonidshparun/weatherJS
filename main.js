import autocomplete from './src/autocomplete.js'
import citiesList from './src/cities.js'

import * as api from './src/api.js';

const APIkey = "bfdb18745741ded8a45c9ac036f93e5e";

const searchBar = document.getElementById("input");
const locationForm = document.getElementById("locationForm");
const location = document.querySelector("#location");
const temperature = document.querySelector("#temperature");
const icon = document.querySelector("#icon");
const desc = document.querySelector("#description");
const range = document.querySelector("#range");
const feelsLike = document.querySelector("#feelsLike");
const date = document.querySelector("#date");

const updateWidget = ({
  temp,
  feels_like,
  temp_max,
  temp_min,
  description,
  iconUrl
}, city) => {
  location.innerText = city;
  temperature.innerText = `${temp}°`;
  icon.setAttribute('src', iconUrl);
  desc.innerText = description;
  range.innerText = `${temp_min}° / ${temp_max}°`;
  feelsLike.innerText = `Feels like ${feels_like}°`
  const dateOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  date.innerText = new Date().toLocaleDateString('en-US', dateOptions);
  searchBar.value = '';
}

const selectLocation = async event => {
  event.preventDefault();
  const url = api.buildUrl(searchBar.value, APIkey);
  const data = await api.sendRequest(url);
  const extracted = api.extractData(data);
  const formatData = api.formatData(extracted);
  updateWidget(formatData, searchBar.value);
}

locationForm.addEventListener('submit', selectLocation)

autocomplete(searchBar, citiesList);