import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_uRxuzCGMeUn8tkAFqN3td9hd8qiKj4qKA96h11FpAycCtgoUiSiMflwg4H02Qwr9';

export async function fetchBreeds() {
  return await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export async function fetchCatByBreed(breedId) {
  return await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}
