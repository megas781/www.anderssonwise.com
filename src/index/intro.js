"use strict";

let scrollController = require("./index.js").scrollController;


//Создать fadeIn эффект при скроллинге для такого-то элемента
function makeScene(target, offset = 0) {
    let fadeInTween = new TweenLite.from(target, 1.2, {
        y: 100,
        opacity: 0,
        ease: Power1.easeOut
    });
    let scene = new ScrollMagic.Scene({
        triggerElement: target,
        triggerHook: 1,
        offset: offset
    });
    scene.setTween(fadeInTween);
    scene.addTo(scrollController);
}

makeScene('.intro__title');
makeScene('.intro__paragraph', 120);
makeScene('.intro__info');
makeScene('.intro__cta-button');


//Отдельная анимация для intro-изображения
let introImageTween = new TweenLite.to('.intro__image-h-animation-wrapper', 1.2, {
    height: getComputedStyle(document.querySelector('.intro__back-image')).height,
    ease: Power1.easeOut
});
let introImageScene = new ScrollMagic.Scene({triggerElement: '.intro__back-image'});
introImageScene.setTween(introImageTween);
// introImageScene.addIndicators();
introImageScene.addTo(scrollController);
