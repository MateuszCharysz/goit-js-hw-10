import './css/styles.css';
import debounce from 'lodash.debounce';

import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//DOM
const searchBox = document.querySelector('#search-box');

//callback/functions
const fetchloader = () => {
  let listToClear = document.querySelectorAll("[toClear]")
  listToClear.forEach(el =>el.remove())
  const searchedName = searchBox.value;
  fetchCountries(searchedName.trim());
};

//event
searchBox.addEventListener('input', debounce((fetchloader), DEBOUNCE_DELAY))
