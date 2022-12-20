// import './sass/_common.scss'
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('.search-form'),
}

const url = 'https://pixabay.com/api/';
const ownKey = '32187725-9ebb8484d7ffd0cb9d2ef83f1';
const urlAdress = '?key=' + ownKey;

// + '&q="cat"&lang=en&page=1&per_page=5'

// const fd = fetch(url).then(r => r.json());
const zzz = axios.get(`${url}${urlAdress}`)
  .then(response => response.data)
  .catch(error => console.log(error));
// const xx = fd.json();
// const xx = response.json();

console.log('ouihi', zzz);

// refs.searchForm.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   console.log('uhli');
//   e.preventdefault();

  // const options = {
  //   key: '32187725-9ebb8484d7ffd0cb9d2ef83f1',
  // }
  // const url = `https://pixabay.com/api/&key='32187725-9ebb8484d7ffd0cb9d2ef83f1'`;
  
  // const fdi = fetch(url);
  // console.log('ouihi',fdi);
    // .then(response => response.data)
    // .then(console.log())
// };

// &q='cat'&lang=en&page=1&per_page=5`