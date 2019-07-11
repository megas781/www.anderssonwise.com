// require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');
let buttons = document.querySelectorAll('.dot');

var textAnimationsArray = [];


buttons[0].addEventListener('click', function () {
    textAnimationsArray.forEach(function (animation) {
        animation.timeScale(0.3);
    })
})
buttons[1].addEventListener('click', function () {
    textAnimationsArray.forEach(function (animation) {
        animation.timeScale(1);
    })
})
buttons[2].addEventListener('click', function () {
    textAnimationsArray.forEach(function (animation) {
        animation.reverse();
    })
})

TweenLite.from('.slider__dots', 1, {
    opacity: 0,
    x: 50,
    delay: 0.5
}, 'secondStep');


// Анимирование переключения слайдов
function startSlidingMechanism() {
    let slides = document.querySelectorAll('.slider__slide');
    let slideIndex = 0;
    let activeSlide = slides[slideIndex];
    let dots = document.querySelectorAll('.slider .dot');
    dots[slideIndex].classList.add('active');

    function animateSlide(slide) {
        slide.classList.add('slider__slide_active');
        let slideImage = slide.querySelector('.slide__image');
        let slideTextContainer = slide.querySelector('.slide__text-container');
        let slideTitle = slide.querySelector('.slide__title');
        let slideSubtitle = slide.querySelector('.slide__subtitle');

        let recursiveAnimation = new TimelineLite();

        recursiveAnimation
            .fromTo(slideImage, 1, {opacity: 0},{opacity: 1})
            .addLabel('imageAppeared')
            .fromTo(slideTitle, 1, {opacity: 0, y: 50}, {opacity: 1, y: 0})
            .fromTo(slideSubtitle, 1, {opacity: 0, y: 50}, {opacity: 1, y: 0})
            .fromTo(slideImage, 7, {scale: 1},{scale: 1.1, ease: Power0.easeNone}, 'imageAppeared-=0.5')

            .addLabel('hide', '-=2')
            .to(slideTextContainer, 1, {opacity: 0, y: -50}, 'hide')
            .to(slideImage, 2, {
                opacity: 0,
                onStart() {

                    //До того, как индекс обновился, деактивируем текущую точку
                    dots[slideIndex].classList.remove('active');

                    slideIndex += 1;
                    if (slideIndex == slides.length) {
                        slideIndex = 0;
                    }
                    animateSlide(slides[slideIndex]);
                    //После того, как индекс обновился, активируем новую точку
                    dots[slideIndex].classList.add('active');
                },
                onComplete() {
                    slide.classList.remove('slider__slide_active');
                }
            }, 'hide')
            .set(slideTextContainer, {opacity: 1, y: 0})

    }

    animateSlide(activeSlide);
}

startSlidingMechanism();



