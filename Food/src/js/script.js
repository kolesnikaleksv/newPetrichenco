"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = require('./modules/form'),
        modal = require('./modules/modalWindow'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        calc = require('./modules/calc');
    
    form();
    modal();
    slider();
    tabs();
    timer();
    cards();
    calc();
});