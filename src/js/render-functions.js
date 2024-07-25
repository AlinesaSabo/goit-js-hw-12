export function renderImageSearch({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}" target="_blank">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}">
      </a>
      <div class="gallery-info">
        <div class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${likes}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${views}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${comments}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');

  document.querySelector('.gallery').innerHTML = markup;
}
