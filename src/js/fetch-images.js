import axios from 'axios';

export async function fetchImages(searchQuery, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api/?key=32187725-9ebb8484d7ffd0cb9d2ef83f1';
  const urlAdress = BASE_URL + `&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;

  return await axios.get(urlAdress)
};
