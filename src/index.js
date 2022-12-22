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
const perPage = 40;

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

  fetchImages(searchQuery, currentPage, perPage)
    .then(({ data }) => {
      const images = data;
      const totalHits = images.totalHits
      if (images.hits.length === 0) {
        console.log('alarm')
        alertNoImagesFound()
        return
      }

      // построить   (images)
      try {
        createCards(images.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      }
      catch {(error) => console.log(error)}

      if  (totalHits > perPage) {    
        refs.loadMoreBtn.classList.remove('is-hidden')
      }
      alertImagesFound(totalHits)
    })
    .catch(error => console.log(error))


  // добавить ещё картинки
  refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

  function onLoadMoreBtn() {
    let totalHits = 0;
    currentPage += 1
    simpleLightBox.destroy()
    try {
      fetchImages(searchQuery, currentPage, perPage)
      .then(({ data }) => {
        // console.log('totalHits1',totalHits)
        totalHits = data.totalHits;
        // console.log('totalHits2',totalHits)
        createCards(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()

        if  (totalHits < perPage * currentPage) {    
          refs.loadMoreBtn.classList.add('is-hidden');
          // console.log('totalHits',totalHits)
          alertEndOfSearch();
        }
        else alertImagesFound(totalHits)
      })
      .catch(error => console.log(error))
    }
    catch {(error) => console.log(error)}

    // console.log('totalHits3',totalHits)
  }
}

function alertImagesFound(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`)
}

function alertNoImagesFound() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function alertEndOfSearch() {
  Notify.info("We're sorry, but you've reached the end of search results.")
}