import './css/styles.css';
import debounce from 'lodash.debounce';

import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//help
const log = console.log;

//DOM
const searchBox = document.querySelector('#search-box');
log(searchBox);
// const countryList = document.querySelector('.country-list');
// log(countryList);
// const countryInfo = document.querySelector('.country-info');
// log(countryInfo);

//css

//callback/functions
const fetchloader = () => {
  let listToClear = document.querySelectorAll("li")
  listToClear.forEach(el =>el.remove())
  const searchedName = searchBox.value;
  fetchCountries(searchedName.trim());
};
// if (countryList.length > 10) {
// Notiflix.Notify.info(
//   'Too many matches found. Please enter a more specific name.',
// );} else if (countryList.length < 10 || countryList.length > 2 ) { //display list (only need flag and name from sever)
// } else {}
// Notiflix.Notify.warning('Oops, there is no country with that name');
// debounce(funciton, DEBOUNCE_DELAY)
//event
searchBox.addEventListener('input', debounce((fetchloader), DEBOUNCE_DELAY))
