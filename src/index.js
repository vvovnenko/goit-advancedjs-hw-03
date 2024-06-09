import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const select = document.querySelector('#breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function displayError() {
  iziToast.show({
    title: 'Error',
    message: '❌ Oops! Something went wrong! Try reloading the page!',
    position: 'topCenter',
    color: 'red',
  });
}

function toggleHidden(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}

function handleBreedSelection(breedId) {
  if (!breedId) {
    return;
  }

  toggleHidden(catInfo, false);
  toggleHidden(loader, true);

  fetchCatByBreed(breedId)
    .then(displayCatInfo)
    .catch(displayError)
    .finally(() => {
      toggleHidden(loader, false);
    });
}

function displayCatInfo(catData) {
  const { name, description, temperament } = catData.breeds[0];

  const catImg = catData.url;

  catInfo.innerHTML = `
      <img class="cat-img" src="${catImg}" alt="${name}"/>
      <div class="cat-description">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
      </div>
  `;

  toggleHidden(catInfo, true);
}

function initializeSelect(data) {
  toggleHidden(select, true);
  new SlimSelect({
    select: select,
    settings: {
      placeholderText: 'Search breed',
    },
    data: [{ placeholder: true, text: '' }, ...data],
    events: {
      afterChange: newVal => handleBreedSelection(newVal[0]?.value),
    },
  });
}

function initializeApp() {
  fetchBreeds()
    .then(breeds => {
      initializeSelect(
        breeds.map(({ id, name }) => ({ text: name, value: id }))
      );
    })
    .catch(displayError)
    .finally(() => {
      toggleHidden(loader, false);
    });
}

initializeApp();
