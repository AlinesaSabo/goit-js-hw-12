import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImagesByQuery } from './js/pixabay-api';
import { renderImageSearch } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadingSpinner = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (!queryValue) {
    gallery.innerHTML = '';
    return;
  }

  showLoadingSpinner();

  searchImagesByQuery(queryValue)
    .then(data => {
      gallery.innerHTML = '';

      if (data.hits.length === 0) {
        iziToast.error({
          titleColor: '#FFFFFF',
          backgroundColor: '#EF4040',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FFFFFF',
          position: 'topRight',
          iconColor: '#FFFFFF',
        });
        return;
      }

      renderImageSearch(data);
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch()
    .finally(() => {
      hideLoadingSpinner();
      form.reset();
    });
}

function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}
