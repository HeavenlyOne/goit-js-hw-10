import axios from "axios";
import { fetchCatByBreed } from "./js/cat-api";
import { summonPussy } from "./js/cat-api";
import { refs } from "./js/refs";
 


  
refs.breedSelect.addEventListener('change', onCatChange)


//функція з axios:
function createMarkup({data}) {
  return data.map(({name, id}) => `<option value="${id}" class="js-cat">${name}</option>`).join('');
}
//базовий варіант з fetch:
// function createMarkup(arr) {
//   return arr.map(({name, id}) => `<option value="${id}" class="js-cat">${name}</option>`).join('');
// }

summonPussy()
  .then(data => {
    // console.dir(data);
    refs.breedSelect.classList.remove('hide')
    return refs.breedSelect.innerHTML = createMarkup(data)
  })
  .catch(err => {
    // console.log(err.response)
    if (!err.response) {
      refs.loader.classList.add("hide");
      refs.error.classList.remove('hide');
    }
  })
  .finally(() => {
    refs.loader.classList.add("hide");
  })


function onCatChange(evt) {
  evt.preventDefault();
  refs.catInfo.innerHTML = ''
  // console.log(evt.currentTarget.value);
  const catID = evt.currentTarget.value
  fetchCatByBreed(catID)
    .then(data => {
      console.log(data);
      return refs.catInfo.innerHTML = createMarkupForKitty(data)
    })
    .catch(err => {
      if (err.response) {
        refs.loader.classList.add("hide");
        refs.error.classList.remove('hide');
    }
    })
    .finally(() => {
      refs.loader.classList.add("hide");
 
     })

}

//функція з axios та крутою деструктуризацією:
function createMarkupForKitty({ data: [{breeds: [{name, description, temperament}], url}] }) {
  return `<img src="${url}" alt="${name}" width="500" height="500">
<div class="cat-info-text"><h1>${name}</h1>
<p>${description}</p>
  <p><b>Temperament:</b> ${temperament}</p></div>`
}
//функція з axios, але з простою деструктуризацією:
// function createMarkupForKitty({ data }) {
//   return `<img src="${data[0].url}" alt="${data[0].breeds[0].name} width="500" height="500">
// <div class="cat-info-text"><h1>${data[0].breeds[0].name}</h1>
// <p>${data[0].breeds[0].description}</p>
//   <p><b>Temperament:</b> ${data[0].breeds[0].temperament}</p></div>`
// }
//базовий варіант з fetch:
// function createMarkupForKitty(arr) {
//   return `<img src="${arr[0].url}" alt="${arr[0].breeds[0].name} width="500" height="500">
// <h1>${arr[0].breeds[0].name}</h1>
// <p>${arr[0].breeds[0].description}</p>
//   <p><b>Temperament:</b> ${arr[0].breeds[0].temperament}</p>`
// }
