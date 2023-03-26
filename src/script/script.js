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

    let toTop = document.querySelector('.to-top');
    let heroHeight;

    if (document.querySelector('.description')) {
        heroHeight = document.querySelector('.description').offsetHeight;
    }

    if (document.querySelector('.brands')) {
        heroHeight = document.querySelector('.brands').offsetHeight;
    }

    let isVisibleToTop = function isVisibleToTop() {
        let y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (y >= heroHeight) {
            toTop.classList.add('to-top--active');
        } else {
            toTop.classList.remove('to-top--active');
        }
    };

    isVisibleToTop(window.scrollY);
    window.addEventListener('scroll', function () {
        let y = window.scrollY;
        isVisibleToTop(y);
    });
})