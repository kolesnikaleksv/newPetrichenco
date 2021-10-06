"use strict";
    import form from './modules/form';
    import modalWindow from './modules/modalWindow';
    import slider from './modules/slider';
    import tabs from './modules/tabs';
    import timer from './modules/timer';
    import cards from './modules/cards';
    import calc from './modules/calc';
    import {openModal} from './modules/modalWindow';

document.addEventListener('DOMContentLoaded', () => {
    const timerModal = setTimeout(() => openModal('.modal', timerModal), 50000);

    
    form('form' , timerModal);
    modalWindow('[data-modal]', '.modal', timerModal);
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2021-10-30');
    cards();
    calc();
    slider({
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});

