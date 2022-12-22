// import './sass/_common.scss'
// import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './js/fetch-images'
import { createCards } from './js/create-cards'

// const BASE_URL = 'https://pixabay.com/api/?key=32187725-9ebb8484d7ffd0cb9d2ef83f1';

let simpleLightBox;
let searchQuery = '';

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

  fetchImages(searchQuery, currentPage).then(({ data }) => {
    const images = data;
    console.log(images);
    // построить   (images)
    createCards(images.hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    refs.loadMoreBtn.classList.remove('is-hidden');
  })


  // добавить ещё картинки
  refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

  function onLoadMoreBtn() {
    currentPage += 1
    simpleLightBox.destroy()

    fetchImages(searchQuery, currentPage)
      .then(({ data }) => {
        console.log('aaaaaaaa', data.totalHits, data.hits)
        if (totalHits === 0) {
          console.log('aaaaaaaa')
          return
        }
        createCards(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()

        // const totalPages = Math.ceil(data.totalHits / perPage)

        // if (page > totalPages) {
        //   loadMoreBtn.classList.add('is-hidden')
        //   alertEndOfSearch()
        // }
      })
      .catch(error => console.log(error))
  }

}

