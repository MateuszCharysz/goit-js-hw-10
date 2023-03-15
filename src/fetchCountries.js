'use strict';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

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

const setCountryList = markup => {
  countryList.insertAdjacentHTML('beforeend', markup);
};
const setCountryInfo = markup => {
  countryInfo.insertAdjacentHTML('beforeend', markup);
};

export const fetchCountries = name => {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(
      httpCodeHandler,
      Notiflix.Notify.warning('Oops, there is no country with that name'),
    )
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
        );
      } else {
        // log(data);
        const listMarkup = data
          .map(element => {
            const { name, flags } = element;
            // log(name);
            return `<li class="list-item" style="background-image:url(${flags.svg});background-size: auto 25px;background-repeat: no-repeat;">${name.official}</li>`;
            // log(flags);
          })
          .join('');
        setCountryList(listMarkup);
        if (data.length === 1) {
          const { capital, population, languages } = data[0];
          log(capital);
          log(population);
          log(languages);
          const infoMarkup = `<li class="list-item list-item--info">Capital: ${capital}</li><li class="list-item list-item--info">Population: ${population}</li><li class="list-item list-item--info">Languages: ${languages.values}</li>`;
          setCountryInfo(infoMarkup);
        }
        // if (data.length > 10) {
        // Notiflix.Notify.info(
        //   'Too many matches found. Please enter a more specific name.',
        // );} else if (data.length < 10 || data.length > 2 ) { //display list (only need flag and name from sever)
        // } else if (data.length ===1) {//display fulll
        // }else {Notiflix.Notify.warning('Oops, there is no country with that name')}
      }
    })
    .catch(error =>
      console.log(
        `Shit went south with fetch from server ${error.name} ${error.message}`,
      ),
    );
};
