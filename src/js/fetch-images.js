import axios from 'axios';

export async function fetchImages(searchQuery, page) {
  // export async function fetchImages(page,searchQuery ) {
  const BASE_URL = 'https://pixabay.com/api/?key=32187725-9ebb8484d7ffd0cb9d2ef83f1';
  const pp = 4;
  // searchQuery = 'cat';
  // console.log(pp);

  const urlAdress = BASE_URL + `&q=${searchQuery}&page=${page}&per_page=${pp}&image_type=photo&orientation=horizontal&safesearch=true`;
  // const urlAdress = BASE_URL + `&q='cat'&page=${page}&per_page=${pp}&image_type=photo&orientation=horizontal`;

  // console.log(urlAdress);
  return await axios.get(urlAdress)
};
// export default fetchImages 