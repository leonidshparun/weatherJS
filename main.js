import autocomplete from './src/autocomplete.js'
import citiesList from './src/cities.js'


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), citiesList);