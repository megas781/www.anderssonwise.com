import './index.css';
import './slider.js'

let onscroll = function () {
    let heroHeight = parseInt(getComputedStyle(document.querySelector('.hero')).height);
    let scroll = window.scrollY;

    // let scrollPastHeroRatio = (scroll / heroHeight);

    //Затемнение слайдшоу при скроллинге
    // document.querySelector('.slider').style.opacity = 1 - scrollPastHeroRatio * 1.2;

    // //Скрывание шапки после скролла слайдшоу
    // if (scrollPastHeroRatio > 0.7) {
    //     document.querySelector('.header').classList.add('hidden');
    // } else {
    //     document.querySelector('.header').classList.remove('hidden');
    // }

    // //Замедление скроллинга текста (параллакс)
    document.querySelectorAll('.slide__text-container').forEach(function (container) {
        container.style.top = `${-scroll/2}px`;
    })
    // document.querySelector('.slide__text-container').style.bottom = `${scroll/2}px`;
};
onscroll();

window.onscroll = onscroll;
