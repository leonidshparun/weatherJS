import autocomplete from './src/autocomplete.js'
import citiesList from './src/cities.js'

import { APIkey } from './src/config.js'

import * as UI from './src/ui.js';
import * as API from './src/api.js';

UI.DOM.locationForm.addEventListener('submit', async event => {
  event.preventDefault();
  const city = UI.DOM.searchBar.value;
  const data = await API.buildData(city, APIkey);
  UI.setCurrentWeather(data, city);
})

autocomplete(UI.DOM.searchBar, citiesList);