// import './sass/_common.scss'
// import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './js/fetch-images'
import { createCards } from './js/create-cards'

// const BASE_URL = 'https://pixabay.com/api/?key=32187725-9ebb8484d7ffd0cb9d2ef83f1';

let simpleLightBox;
let searchQuery = '';
const perPage = 4;

const refs = {
  searchForm : document.querySelector('.search-form'),
  divGallery : document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
}

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  refs.divGallery.innerHTML = '';
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value;
  // if (searchQuery === '') { return }
  let currentPage = 1;

  fetchImages(searchQuery, currentPage, perPage).then(({ data }) => {
    const images = data;
    console.log(images);
    console.log('aaa', data.totalHits, data.hits)
    if (data.hits.length === 0) {
      console.log('alarm')
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      // Notify.success('Sol lucet omnibus');
      // Notify.failure('Qui timide rogat docet negare');
      // Notify.warning('Memento te hominem esse');
      // Notify.info('Cogito ergo sum');
      return
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    // построить   (images)
    createCards(images.hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    

    if  (data.totalHits > perPage) {    
      refs.loadMoreBtn.classList.remove('is-hidden')
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.11111`);
  })


  // добавить ещё картинки
  refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

  function onLoadMoreBtn() {
    currentPage += 1
    simpleLightBox.destroy()

    fetchImages(searchQuery, currentPage, perPage)
      .then(({ data }) => {
        createCards(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()

        if  (data.totalHits < perPage * currentPage) {    
          refs.loadMoreBtn.classList.add('is-hidden');
          console.log('End')
          Notify.info("We're sorry, but you've reached the end of search results.");
        }
        else    { Notify.success(`Hooray! We found ${totalHits} images.22222`);}


      })
      .catch(error => console.log(error))
  }

}

