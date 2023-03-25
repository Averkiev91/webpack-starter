import '../index.html'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/style.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".hero-slider", {
        modules: [Navigation, Pagination, Autoplay],
        pagination: {
            el: ".swiper-pagination",
            type: 'bullets',
            clickable: true
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.hero__next',
            prevEl: '.hero__prev',
        },
        on: {
            init: function () {
                const paginationBullets = document.querySelectorAll('.hero__pag .swiper-pagination-bullet');

                paginationBullets.forEach(el => {
                    el.innerHTML = `<span class="hero__bar"></span>`;
                });
            },
        }
    });

})