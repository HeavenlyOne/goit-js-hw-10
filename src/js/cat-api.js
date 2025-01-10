import axios from "axios";
import { refs } from "./refs";

const API_KEY = "live_r1OtvY6ZkoM5DgYqdB1rUTMfBcdhpbOJS8F6qVvFTw2v0idRqLlpDlywMSkmr6fh";
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function summonPussy() {
  refs.loader.classList.remove("hide");
  return axios.get(`${BASE_URL}/breeds`)
}

export function fetchCatByBreed(breedId) {
   refs.error.classList.add('hide');
  
  refs.loader.classList.remove("hide");
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
};

//базовий варіант з fetch:
// const headers = new Headers({
//     "Content-Type": "application/json",
//     "x-api-key": API_KEY,
//   });

//   const requestOptions = {
//     method: 'GET',
//     headers: headers,
//     redirect: 'follow'
//   };

//базовий варіант з fetch:
// export function summonPussy() {
//   return fetch(`${BASE_URL}/breeds`, requestOptions)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json()
//     })
// }

//базовий варіант з fetch:
// export function fetchCatByBreed(breedId) {
//   return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, requestOptions)
//     .then(response => {
//       return response.json()
//     })
// };