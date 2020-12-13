import autocomplete from './src/autocomplete.js'
import citiesList from './src/cities.js'

import {
  APIkey
} from './src/config.js'

import {
  DOM,
  setCurrentWeather
} from './src/ui.js';

import buildData from './src/api.js';

DOM.locationForm.addEventListener('submit', async event => {
  event.preventDefault();
  const city = DOM.searchBar.value;
  const data = await buildData({
    city
  }, APIkey);
  setCurrentWeather(data);
})

const getPosition = () => new Promise((res, rej) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({
      coords
    }) => res(coords));
  } else {
    rej(new Error('no permission'))
  }

}).then(({
  latitude,
  longitude
}) => ({
  lat: latitude,
  lon: longitude
}))

const setWeatherForMyLocation = async () => {
  const position = await getPosition();
  const data = await buildData({
    coord: position
  }, APIkey);
  setCurrentWeather(data);
}

document.addEventListener("DOMContentLoaded", setWeatherForMyLocation)
autocomplete(DOM.searchBar, citiesList);