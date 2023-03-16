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
        const listMarkup = data
          .map(element => {
            const { name, flags } = element;
            return `<li class="list-item" style="background-image:url(${flags.svg});background-size: auto 25px;background-repeat: no-repeat;" toClear>${name.official}</li>`;
          })
          .join('');
        setCountryList(listMarkup);
        if (data.length === 1) {
          const { capital, population, languages } = data[0];
          const infoMarkup = `<p class="list-item list-item--info" toClear><b>Capital:</b> ${capital}</p><p class="list-item list-item--info" toClear><b>Population:</b> ${population}</p><p class="list-item list-item--info" toClear><b>Languages:</b> ${Object.values(
            languages,
          )}</p>`;
          setCountryInfo(infoMarkup);
        }
      }
    })
    .catch(error =>
      console.log(
        `Shit went south with fetch from server ${error.name} ${error.message}`,
      ),
    );
};
