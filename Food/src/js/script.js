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

//Module
//           This is a deprecated way of compiling files

// we can create meny modules and export them into one file
// now we create one module with several functions and export them
// to the main.js file
    function myModule() {
        this.sayHi = function() {
            console.log('hi');
        };

        this.sayBye = function() {
            console.log('bye!');
        };
    }

    module.exports = myModule;

// and now we import this function in main.js file
    const myModule = require('./script');

    const myNewModule = new myModule();
// we can use this object
    myNewModule.sayBye();
    myNewModule.sayHi();
// webpack can compile these files

//      This is the modern way of compiling files (ES6)

//we will export something from main.js file
// there are two ways to export anything
    export let one = 1;
// or
    let two = 2;
    export {two};
// they are both equal

// and we can also export functions
    export function sayHello() {
        console.log('Hi');
    }

// now we can import into script.js file
    // import {one, two} from './main';

    // console.log(`${one} and ${two}`);

// and we can immediately rename the incoming entity
    // import {one as first} from './main';

    // console.log(first);
// To get all entities from a file we can use this syntax
    import * as data from './main';

    console.log(`${data.one} and ${data.two}`);
    data.sayHello();
// actually 'data' is an object

//There is also one way to export in modules: it is a default export
    export default function sayHello() {
        console.log('Hi');
    }
// and import
    import sayHello from './main';

    sayHello();

    
// we can connect scripts without 'webpack' in this way:
    // <script type='module' src='./script.js' ></script>
    // <script type='module' src='./main.js' ></script>
// and we must write down the full path
    import {one, two} from './main.js';
    import sayHello from './main.js';


    console.log(`${one} and ${two}`);
    sayHello();
// but it is not used

