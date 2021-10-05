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

// Errors and construction try-catch

    // try {
    //     console.log('first commit');
    //     console.log(a);      //we get no error our code is continue
    //     console.log('resolt');
    // } catch(error){
    //     console.log('my error');
    // }

    // console.log('Still normal');
// in console we receive:
// first commit
// my error
// Still normal
 
    // try {
    //     console.log('first commit');
    //     console.log(a);
    // } catch(error){
    //     console.log('my error');
    //     console.log(error.name);
    //     console.log(error.message);
    //     console.log(error.stack);
    // }
    // console.log('Still normal');
// in console we receive:

// first commit
// my error
// ReferenceError
// a is not defined
// ReferenceError: a is not defined
//     at Object.<anonymous> (e:\Open_server\OSPanel\domains\newjsPetrichenko\Food\src\js\tempCodeRunnerFile.js:3:21)
//     at Module._compile (internal/modules/cjs/loader.js:778:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
//     at Module.load (internal/modules/cjs/loader.js:653:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
//     at startup (internal/bootstrap/node.js:283:19)
//     at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)
// Still normal
    // try {
    //     console.log('first commit');
    //     console.log(a);
    // } catch(error){
    //     console.log('my error');
    // } finally {
    //     console.log('this code will always be executed');
    // }
    // console.log('Still normal');
