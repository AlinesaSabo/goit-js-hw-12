import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImagesByQuery } from './js/pixabay-api';
import { renderImageSearch } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadingSpinner = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const params = {
  page: 1,
  pageSize: 15,
  q: '',
  maxPage: 0,
};

hideLoadMoreBtn();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.removeEventListener('click', handleLoadMore);
  hideLoadMoreBtn();

  const form = event.currentTarget;
  params.q = form.elements.query.value.trim();

  if (!params.q) {
    gallery.innerHTML = '';
    return;
  }

  params.page = 1;
  showLoadingSpinner();

  try {
    const { hits, totalHits } = await searchImagesByQuery(params);

    if (totalHits === 0) {
      iziToast.error({
        titleColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FFFFFF',
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    }

    params.maxPage = Math.ceil(totalHits / params.pageSize);
    renderImageSearch({ hits });

    if (params.maxPage > 1) {
      showLoadMoreBtn();
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      hideLoadMoreBtn();
    }

    lightbox.refresh();
  } catch (err) {
  } finally {
    hideLoadingSpinner();
  }
}

async function handleLoadMore() {
  if (params.page >= params.maxPage) {
    hideLoadMoreBtn();
    return;
  }

  params.page += 1;
  showLoadingSpinner();

  try {
    const { hits } = await searchImagesByQuery(params);
    renderImageSearch({ hits });

    if (params.page >= params.maxPage) {
      iziToast.info({
        titleColor: '#FFFFFF',
        backgroundColor: '#FFA500',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FFFFFF',
        position: 'topRight',
      });
      hideLoadMoreBtn();
    }

    lightbox.refresh();

    scrollToNextPosition();
  } catch (err) {
  } finally {
    hideLoadingSpinner();
    form.reset();
  }
}

function scrollToNextPosition() {
  const galleryItem = gallery.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
