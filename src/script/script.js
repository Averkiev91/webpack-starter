import '../index.html'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/style.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

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


    let burger = document.querySelector('.burger');
    let menu = document.querySelector('.header__nav');
    let overlay = document.querySelector('.overlay');

    let disScroll = function disScroll() {
        let pagePosition = window.scrollY;
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    };

    let enScroll = function enScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        document.body.style.top = 'auto';
        document.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    };

    burger.addEventListener('click', function (e) {
        burger.classList.toggle('burger--active');
        menu.classList.toggle('header__nav--active');
        overlay.classList.toggle('overlay--active');

        if (burger.classList.contains('burger--active')) {
            disScroll();
        } else {
            enScroll();
        }
    });

    const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }));

    const form = document.querySelector('.contacts-section__form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // отменяем стандартное поведение формы

        const name = document.querySelector('.form-field__input');
        const email = document.querySelector('.form-field__input');
        const message = document.querySelector('.form-field__input');

        // отправляем письмо
        transporter.sendMail({
            from: email,
            to: 'it@ital-truck.ru', // адрес получателя
            subject: 'Сообщение с формы обратной связи',
            text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
        }, (error, info) => {
            if (error) {
                console.error(error);
                alert('Ошибка отправки сообщения');
            } else {
                console.log(info.response);
                alert('Сообщение успешно отправлено');
            }
        });
    });
})