// import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '45076495-063a30a4096c3d430f822662d';

axios.defaults.baseURL = URL;

export function searchImagesByQuery({ page = 1, per_page = 15, q = '' } = {}) {
  return axios
    .get('', {
      params: {
        page,
        per_page,
        q,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    })
    .then(({ data }) => data);
}
