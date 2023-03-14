'use strict';
const countryList = document.querySelector('.country-list');

const countryInfo = document.querySelector('.country-info');

//help
const log = console.log;
const httpCodeHandler = response => {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

const setCountryList =() => {}
const setCountryInfo =() => {}

export const fetchCountries = name => {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(httpCodeHandler)
    .then(data => {
      log(data);
      // if (data.length > 10) {
      // Notiflix.Notify.info(
      //   'Too many matches found. Please enter a more specific name.',
      // );} else if (data.length < 10 || data.length > 2 ) { //display list (only need flag and name from sever)
      // } else if (data.length ===1) {//display fulll (only need flag and name from sever)

      // }else {}
      // Notiflix.Notify.warning('Oops, there is no country with that name');
    })
    .catch(error =>
      console.log(
        `Shit went south with fetch from server ${error.name} ${error.message}`,
      ),
    );
};
