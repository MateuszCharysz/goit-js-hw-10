'use strict'
export let countryList = undefined
export const fetchCountries = name => {
    fetch(`https://restcountries.com/v3.1/${name}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data =>{
        try { countryList = JSON.parse(data)

        } catch (error) {
            console.log(error.name)
            console.log(error.message)
        }
    })
    .catch(error => console.log(`Shit went south with fetch from server ${error.name} ${error.message}`));
}
