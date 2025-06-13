import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

export const initReviewsSlider = () => {
  new Swiper('#reviews-slider', {
    autoplay: {
      delay: 1500,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    mousewheel: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '#reviews-slider-next',
      prevEl: '#reviews-slider-prev',
    },
  })
}
