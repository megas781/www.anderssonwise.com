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

    let currentSlideIndex = 0;
    let nextSlideIndex = 1;
    let currentSlide = slides[currentSlideIndex];

    let dots = document.querySelectorAll('.slider .dot');
    dots[currentSlideIndex].classList.add('active');

    function animateSlide(slide) {

        let slideImage = slide.querySelector('.slide__image');
        let slideTextContainer = slide.querySelector('.slide__text-container');
        let slideTitle = slide.querySelector('.slide__title');
        let slideSubtitle = slide.querySelector('.slide__subtitle');

        let recursiveAnimation = new TimelineLite();
        recursiveAnimation.delay = 1;

        recursiveAnimation
            .fromTo(slideTitle, 1, {opacity: 0, y: 50}, {opacity: 1, y: 0})
            .fromTo(slideSubtitle, 1, {opacity: 0, y: 50}, {opacity: 1, y: 0})
            .fromTo(slideImage, 7, {scale: 1}, {scale: 1.1, ease: Power0.easeNone}, 0)

            .addLabel('hide', '-=1')
            .to(slideTextContainer, 1, {y: -50}, 'hide')
            .to(slide, 1, {
                opacity: 0,
                onStart() {

                    //До того, как индекс обновился, деактивируем текущую точку
                    dots[currentSlideIndex].classList.remove('active');

                    //После того, как индекс обновился, активируем новую точку
                    dots[(currentSlideIndex + 1) % slides.length].classList.add('active');

                    console.log(`вызов анимации слайда по индексу ${(currentSlideIndex + 1) % slides.length}`);
                    animateSlide(slides[(currentSlideIndex + 1) % slides.length]);
                },
                onComplete() {

                    slides[currentSlideIndex].classList.remove('current');

                    // Делаем смещение индексов
                    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                    nextSlideIndex = (nextSlideIndex + 1) % slides.length;

                    slides[currentSlideIndex].classList.remove('next');
                    slides[currentSlideIndex].classList.add('current');
                    slides[nextSlideIndex].classList.add('next');
                }
            }, 'hide')
            .set(slideTextContainer, {y: 0})
            .set(slide, {opacity: 1})

    }

    animateSlide(currentSlide);
}

startSlidingMechanism();



