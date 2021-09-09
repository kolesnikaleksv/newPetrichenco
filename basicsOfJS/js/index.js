"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        while(personalMovieDB.count == null || personalMovieDB.count == '' || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('How many movies have you already watched?', '');
        }
    },
    showMyDB: function() {
        if(personalMovieDB.privat == false) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: function() {
        for(let i = 0; i < 3; i++) {
            let a = prompt(`What is your favorite genre under number?${i + 1}`, '');
            if(a == null || a == '') {
                i--;
            } else {
                personalMovieDB.genres[i] = a;
            }
        }
        personalMovieDB.genres.forEach((element, index) => {
            console.log(`Favorite genre # ${index + 1} - is ${element}`);
        })
    },
    rememberMyFilms: function() {
        for(let i = 0; i < 2; i++) {
            let a = prompt('One of the last movies you watched?', ''),
                b = prompt('How mach do you appreciate it?', '');
                
                if(a == "" || b == '' || a == null || b == null ||  a.length > 50 || b.length > 50){
                    i--;
                    console.log('fail');
                } else {
                    personalMovieDB.movies[a] = b;
                }
        }
    },
    toggleVisibleMyDB: function() {
        if(!personalMovieDB.privat) {
            personalMovieDB.privat = true;
        } else {
            personalMovieDB.privat = false;
        }
    },
    personalLevelDetected: function() {
        if(personalMovieDB.count <= 10 && personalMovieDB.count > 0) {
            alert('You have watched too few movies.');
        } else if(personalMovieDB.count > 10 && personalMovieDB.count < 30) {
            alert("You are a classic spectator.");
        } else if(personalMovieDB.count >= 30) {
            alert("You are a big fan of movies.")
        } else {
            alert("An error occurred!");
        }
    }
};

console.log(personalMovieDB);

//Retrieven items from the DOM page

let btm = document.getElementsByTagName('div'); // obtaining a collection of items
let id = document.getElementById('sdf'); // obtaining an item by ID
let clasS = document.getElementsByClassName('black'); // receiving a collection of items
let selectorAll = document.querySelectorAll('.class //or div //or #ID'); // gets a collection of elements and has a method - foreach
let firstElement = document.querySelector('.selector'); // gets the first selector from the page

//Work with elements on the page

let box = document.getElementById('box'),
    btns = document.getElementsByTagName('div'),
    hearts = document.querySelectorAll('.heart');

    box.style.backgroundColor = 'black'; // we change color
    box.style.width = '400px'; 

    box.style.cssText = `background-color: blue ; width: ${num}`; // regular css and js

    btns[1].style.borderRadius = '100%';

    for(let i = 0; i < hearts.length; i++) {      // we will not use it
        hearts[i].style.backgroundColor = 'blue'; 
    }

    hearts.forEach(item => {
        item.style.backgroundColor = 'blue';
    });

// creating elements

let elem = document.createElement('div');
    elem.classList.add('black'); // adding a class to elem
    document.body.append(elem); // insert it on the page down at the body
    document.querySelectorAll('.wrapper').append(elem); // another way
    // or
let wrapper = document.querySelector('.wrapper');
    wrapper.append(elem);

    document.body.prepend(elem); // insert it on the page up at the body
    wrapper.before(elem); //insert before the item
    wrapper.after(elem); // insert after the item

    btns[2].remove(); //delete the elment
    btns[1].replaceWith(elem); // change elements
    elem.innerHTML = '<h1>Hello world!</h1>'; // insert text and HTML
    elem.textContent = 'Hello world!'; // insert only a text
    //where we insert         //command where// what to insert
    elem.insertAdjacentElement('', '<h2>Hello!</h2>'); // insert piece of HTMLcode after or before a specific HTMLtag
    // commands is afterbegin, beforebegin, afterend, beforeend
    // getting elements not though the document
    let mod = wrapper.querySelectorAll('.heart');